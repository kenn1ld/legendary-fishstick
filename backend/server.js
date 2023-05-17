import express, { json } from "express";
import { connect } from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import weatherRoutes from "./routes/weather"; // Import weather routes
import { get } from "axios";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;

app.use(json());
app.use(cors());

// Connect to MongoDB
const dbURI =
  "mongodb+srv://kennethskjellvik:Random123%3C@cluster0.zyk0ysm.mongodb.net/test";

connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Use the userRoutes, authRoutes, and weatherRoutes middleware
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes); // Use weather routes

// Add the following route for the VirusTotal API
app.get("/api/virustotal/:domain", async (req, res) => {
  const domain = req.params.domain;
  const apiKey =
    "63afabfbc82111b8748643b02e211ea7b6831463a33d3af2aa96082eca27a9da"; // Replace with your VirusTotal API key
  const url = `https://www.virustotal.com/api/v3/domains/${domain}`;

  try {
    const response = await get(url, { headers: { "x-apikey": apiKey } });
    res.send(response.data);
  } catch (error) {
    console.error("Error during VirusTotal API request", error);
    res.status(500).send({ error: "Error during VirusTotal API request" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
