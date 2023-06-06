import express from "express";
import { Schema, model } from "mongoose";
import { StatusCodes } from "http-status-codes";

const router = express.Router();
const baseRoute = "/users";

// User schema definition
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

// Async handler to catch errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Helper function to send response with status and data
const sendResponse = (res, status, data) => {
  res.status(status).send(data);
};

// GET all users
router.get(
  baseRoute,
  asyncHandler(async (req, res) => {
    const users = await User.find();
    sendResponse(res, StatusCodes.OK, users);
  })
);

// GET user by ID
router.get(
  `${baseRoute}/:id`,
  asyncHandler(async ({ params }, res) => {
    const { id } = params;
    const user = await User.findById(id);
    user
      ? sendResponse(res, StatusCodes.OK, user)
      : sendResponse(res, StatusCodes.NOT_FOUND, { message: "User not found" });
  })
);

// GET users by name
router.get(
  `${baseRoute}/search/:name`,
  asyncHandler(async ({ params }, res) => {
    const { name } = params;
    const users = await User.find({ name: new RegExp(name, "i") });
    sendResponse(res, StatusCodes.OK, users);
  })
);

// GET users with pagination
router.get(
  `${baseRoute}/page/:pageNumber/limit/:limit`,
  asyncHandler(async ({ params }, res) => {
    const { pageNumber, limit } = params;
    const skip = (pageNumber - 1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    sendResponse(res, StatusCodes.OK, users);
  })
);

// POST new user
router.post(
  baseRoute,
  asyncHandler(async (req, res) => {
    const user = new User(req.body);
    const savedUser = await user.save();
    sendResponse(res, StatusCodes.CREATED, savedUser);
  })
);

// PUT update user role
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

      updatedUser
        ? sendResponse(res, StatusCodes.OK, updatedUser)
        : sendResponse(res, StatusCodes.NOT_FOUND, {
            message: "User not found",
          });
    } catch (error) {
      sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
        message: "Failed to update user role",
      });
    }
  })
);

// DELETE user
router.delete(
  `${baseRoute}/:id`,
  asyncHandler(async ({ params }, res) => {
    const { id } = params;
    const deletedUser = await User.findByIdAndDelete(id);
    deletedUser
      ? sendResponse(res, StatusCodes.OK, {
          message: "User deleted",
          user: deletedUser,
        })
      : sendResponse(res, StatusCodes.NOT_FOUND, { message: "User not found" });
  })
);

export default router;
