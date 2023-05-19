import { Router } from "express";
import { model, Types } from "mongoose";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { check, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

dotenv.config();

const router = Router();
router.use(helmet()); // Use helmet for HTTP security headers

const User = model("User");
const { verify, sign } = jwt;
const secretKey = process.env.JWT_SECRET_KEY;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.use(limiter); // Apply to all requests

const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

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

router.post(
  "/register",
  [
    // Validate inputs
    check("name").isLength({ min: 1 }),
    check("email").isEmail(),
    check("username").isLength({ min: 3 }),
    check("password").isLength({ min: 6 }),
  ],
  asyncHandler(async (req, res) => {
    // Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, username, password, role } = req.body;
    const hashedPassword = await hash(password, 10);
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();
    // Ensure sensitive data isn't sent back to the client
    const { password: _, ...savedUserWithoutPassword } = savedUser.toObject();
    res.status(201).send(savedUserWithoutPassword);
  })
);

router.post(
  "/login",
  [
    // Validate inputs
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  asyncHandler(async (req, res) => {
    // Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
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
