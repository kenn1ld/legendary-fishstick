const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).send({ message: "Access denied" });
  }

  // Extract the actual token from the header
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      "BT7b4mwRtPwuc5SHjxLN%M*$vSaSHCrHWgLor^222i*KDa*oBHYzBa@JmmP9^j*E4URS57gNfHiotVReJ$vAiJQ6sjC*xJ!P7CTDzucTbdSTNk*mUk4hxv@hbio7xVYt"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token", error });
  }
};

// Register a new user
router.post("/register", async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send({ message: "Error registering user", error });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { _id: user._id },
      "BT7b4mwRtPwuc5SHjxLN%M*$vSaSHCrHWgLor^222i*KDa*oBHYzBa@JmmP9^j*E4URS57gNfHiotVReJ$vAiJQ6sjC*xJ!P7CTDzucTbdSTNk*mUk4hxv@hbio7xVYt",
      {
        expiresIn: "12h",
      }
    );

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ message: "Error logging in", error });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: "Error getting user", error });
  }
});

module.exports = router;
