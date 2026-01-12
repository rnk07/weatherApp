import express from 'express'
import fetch from 'node-fetch';

const router = express.Router();
const API_KY = "";

// GET 
router.get("/:city", async (req, res) => {

    try {
        const { city } = req.params;
        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }


        const url = `http://api.weatherapi.com/v1/current.json?key=${API_KY}&q=${city}&aqi=no`;


        const response = await fetch(url)
        const data = await response.json();

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
        res.status(500).json({error:"Server Side Error."})

    }



})



export default router;