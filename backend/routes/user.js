import express from "express";
import { Schema, model } from "mongoose";
import { StatusCodes } from "http-status-codes";

const router = express.Router();
const baseRoute = "/users";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  bio: String,
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

const User = model("User", userSchema);

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get(
  baseRoute,
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(StatusCodes.OK).send(users);
  })
);

router.get(
  `${baseRoute}/:id`,
  asyncHandler(async ({ params }, res) => {
    const { id } = params;
    const user = await User.findById(id);
    if (user) {
      res.status(StatusCodes.OK).send(user);
    } else {
      res.status(StatusCodes.NOT_FOUND).send({ message: "User not found" });
    }
  })
);

router.get(
  `${baseRoute}/search/:name`,
  asyncHandler(async ({ params }, res) => {
    const { name } = params;
    const users = await User.find({ name: new RegExp(name, "i") });
    res.status(StatusCodes.OK).send(users);
  })
);

router.get(
  `${baseRoute}/page/:pageNumber/limit/:limit`,
  asyncHandler(async ({ params }, res) => {
    const { pageNumber, limit } = params;
    const skip = (pageNumber - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    res.status(StatusCodes.OK).send(users);
  })
);

router.post(
  baseRoute,
  asyncHandler(async (req, res) => {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(StatusCodes.CREATED).send(savedUser);
  })
);

router.put(
  `${baseRoute}/:id`,
  asyncHandler(async ({ params, body }, res) => {
    const { id } = params;
    const { role } = body;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      );

      if (updatedUser) {
        res.status(StatusCodes.OK).send(updatedUser);
      } else {
        res.status(StatusCodes.NOT_FOUND).send({ message: "User not found" });
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "Failed to update user role" });
    }
  })
);

router.delete(
  `${baseRoute}/:id`,
  asyncHandler(async ({ params }, res) => {
    const { id } = params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res
        .status(StatusCodes.OK)
        .send({ message: "User deleted", user: deletedUser });
    } else {
      res.status(StatusCodes.NOT_FOUND).send({ message: "User not found" });
    }
  })
);

export default router;
