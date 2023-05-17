import { Router } from "express";
import { request } from "axios";
const router = Router();

const API_KEY = "e1eaee0d89msh3ee12d7ea099493p1dc8f3jsn00876a950278";

const visualCrossingOptions = {
  method: "GET",
  url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
  params: {
    aggregateHours: "24",
    location: "Washington,DC,USA",
    contentType: "csv",
    unitGroup: "us",
    shortColumnNames: "0",
  },
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
  },
};

router.get("/weather", async (req, res) => {
  try {
    const response = await request(visualCrossingOptions);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

export default router;
