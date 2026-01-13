import express from 'express'
import fetch from 'node-fetch';
import { getRedisClient } from '../utils/redisClient.js';


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



        // Check First Redis Client avaiable or not
        let cachedData;
        const redisClient = getRedisClient(); //Get latest Redis Client State
        if (redisClient) {

            // Check City is in Cache or not
            try {
                cachedData = await redisClient.get(city.toLowerCase());
                
            } catch (error) {
                console.warn("Redis GET failed",error.message)
            }
            if (cachedData) {
                console.log("Cache hit")
                return res.json(JSON.parse(cachedData))
            }
        }


        console.log("Cache miss- fetching from API");

        const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;


        const response = await fetch(url)
        const data = await response.json();
        console.log(data)

        // Handle Invalid City
        if (data.error) {
            console.warn("⚠️ Weather API error", data.error);
            return res.status(404).json({
                message: data.error.message
            })
        }

        // Send back needed Data

        const result = {
            city: data.location.name,
            state: data.location.region,
            country: data.location.country,
            temprature: data.current.temp_c,
            feelsLike: data.current.feelslike_c,
            condition: data.current.condition.text,
            wind: data.current.wind_kph,
            humidity: data.current.humidity

        }

        // Redis impelement - Save Data in Cache for 2 min TTL

        if(redisClient){
            try {
                
                await redisClient.setEx(city.toLowerCase(), 120, JSON.stringify(result))
            } catch (error) {
                console.error("Redis Set Failed:",error.message)
            }
        }

        res.json(result);



    } catch (error) {

        // console.error(error);
        res.status(500).json({ error: "Server Side Error." })

    }



})



export default router;