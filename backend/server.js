import express, { json } from "express";
import mongoose, { connect } from "mongoose";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import Visitor from "./models/visitor.js";

dotenv.config();

const app = express();
const { PORT = 5000, MONGO_URI, VIRUSTOTAL_API_KEY } = process.env;

// Middleware setup
app.use(json());
app.use(cors());

// Connect to MongoDB
connectToMongoDB();

// Use the userRoutes and authRoutes middleware
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// New route for visitors
app.get("/api/visitors", handleVisitors);

// Add the following route for the VirusTotal API
app.get("/api/virustotal/:domain", handleVirusTotal);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Functions to keep the code DRY, KISS, and SOLID
async function connectToMongoDB() {
  try {
    await connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

async function handleVisitors(req, res) {
  const ip = req.ip;

  // Check if the IP already exists in the database
  let visitor = await Visitor.findOne({ ip });

  if (!visitor) {
    // If it doesn't exist, create a new one
    visitor = new Visitor({ ip });
    await visitor.save();
  }

  // Count all unique visitors
  const count = await Visitor.countDocuments();

  res.json({ count });
}

async function handleVirusTotal(req, res) {
  const domain = req.params.domain;
  const url = `https://www.virustotal.com/api/v3/domains/${domain}`;

  try {
    const response = await axios.get(url, {
      headers: { "x-apikey": VIRUSTOTAL_API_KEY },
    });
    res.send(response.data);
  } catch (error) {
    errorHandler(error, res);
  }
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}
