import express, { json } from "express";
import { connect } from "mongoose";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import pkg from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Configuring express application
const app = express();
const port = process.env.PORT || 5000;
const { get } = pkg;
// Middleware setup
function setupMiddleware(app) {
  app.use(json());
  app.use(cors());
}

setupMiddleware(app);

// Connect to MongoDB
const dbURI = process.env.MONGO_URI;

connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Use the userRoutes and authRoutes middleware
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Add the following route for the VirusTotal API
app.get("/api/virustotal/:domain", async (req, res) => {
  const domain = req.params.domain;
  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  const url = `https://www.virustotal.com/api/v3/domains/${domain}`;

  try {
    const response = await get(url, { headers: { "x-apikey": apiKey } });
    res.send(response.data);
  } catch (error) {
    console.error("Error during VirusTotal API request", error);
    res.status(500).send({
      error:
        "There was a problem processing your request. Please try again later.",
    });
  }
});

// Error handling
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
