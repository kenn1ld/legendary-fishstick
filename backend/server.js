import express, { json } from "express";

import { connect } from "mongoose";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const { PORT = 5000, MONGO_URI, VIRUSTOTAL_API_KEY } = process.env;

// Middleware setup
app.use(json());
app.use(cors());

// Connect to MongoDB
(async () => {
  try {
    await connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
})();

// Use the userRoutes and authRoutes middleware
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Add the following route for the VirusTotal API
app.get("/api/virustotal/:domain", async (req, res) => {
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
});

// Error handling
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
