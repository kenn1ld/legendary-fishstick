const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Add this line right after setting up express.json()

// Connect to MongoDB
const dbURI =
  "mongodb+srv://kennethskjellvik:Random123%3C@cluster0.zyk0ysm.mongodb.net/test";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Use the userRoutes and authRoutes middleware
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Add the following route for the VirusTotal API
app.get("/api/virustotal/:domain", async (req, res) => {
  const domain = req.params.domain;
  const apiKey =
    "63afabfbc82111b8748643b02e211ea7b6831463a33d3af2aa96082eca27a9da"; // Replace with your VirusTotal API key
  const url = `https://www.virustotal.com/api/v3/domains/${domain}`;

  try {
    const response = await axios.get(url, { headers: { "x-apikey": apiKey } });
    res.send(response.data);
  } catch (error) {
    console.error("Error during VirusTotal API request", error);
    res.status(500).send({ error: "Error during VirusTotal API request" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
