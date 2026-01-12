import express from 'express'
import fetch from 'node-fetch';


const router = express.Router();


// GET 
router.get("/:city", async (req, res) => {
    const API_KEY = process.env.API_KEY;  //Uses api key from .env file
    try {
        console.log(req.params)
        const { city } = req.params;
        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }

        if (!API_KEY) return res.status(500).json({ error: "API key missing" });

        const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;


        const response = await fetch(url)
        const data = await response.json();
        console.log(data)

        // Send back needed Data

        const result = {
            city: data.location.name,
            state: data.location.region,
            country: data.location.country,
            temprature: data.current.temp_c,

        }

        res.json(result);



    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Server Side Error." })

    }



})



export default router;