import { Router } from "express";
import { model, Types } from "mongoose";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { check, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import sanitize from "mongo-sanitize";

dotenv.config();

const router = Router();
router.use(helmet());
router.use(cors());

const User = model("User");
const { verify, sign } = jwt;
const secretKey = process.env.JWT_SECRET_KEY;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

router.use(limiter);

const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch((err) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).send({ message: "Access denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
};

const validateAndSanitize = (fields) => [
  ...fields.map((field) => check(field).escape().trim()),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  "/register",
  validateAndSanitize(["name", "email", "username", "password"]),
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { name, email, username, password, role } = req.body;
    const hashedPassword = await hash(password, 12);
    const newUser = new User({
      name: sanitize(name),
      email: sanitize(email),
      username: sanitize(username),
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();
    const { password: _, ...savedUserWithoutPassword } = savedUser.toObject();
    res.status(201).send(savedUserWithoutPassword);
  })
);

router.post(
  "/login",
  validateAndSanitize(["email", "password"]),
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: sanitize(email) });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = sign({ _id: user._id }, secretKey, { expiresIn: "12h" });

    res.status(200).send({ token });
  })
);

router.get(
  "/me",
  asyncHandler(authMiddleware),
  asyncHandler(async (req, res) => {
    if (!Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).send({ message: "Invalid user ID" });
    }
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  })
);

export default router;
