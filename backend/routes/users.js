import { Router } from "express";
const router = Router();
import { Schema, model } from "mongoose";

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

const User = model("User", userSchema);

//-----------------------------GET---------------------------------------------------//
// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: "Error getting users", error });
  }
});
// Get User by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Error getting user", error });
  }
});
// Search Users by Name
router.get("/search/:name", async (req, res) => {
  try {
    const users = await User.find({ name: new RegExp(req.params.name, "i") });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: "Error searching users", error });
  }
});
// Get Users with Pagination
router.get("/page/:pageNumber/limit/:limit", async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.pageNumber);
    const limit = parseInt(req.params.limit);
    const users = await User.find()
      .skip((pageNumber - 1) * limit)
      .limit(limit);
    res.status(200).send(users);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error getting users with pagination", error });
  }
});

//------------------------------------post----------------------------------------//

// Create user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send({ message: "Error saving user", error });
  }
});
//------------------------------------put----------------------------------------//

// Update user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.status(200).send(updatedUser);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Error updating user", error });
  }
});
//------------------------------------delete----------------------------------------//

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).send({ message: "User deleted", user: deletedUser });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Error deleting user", error });
  }
});

export default router;
