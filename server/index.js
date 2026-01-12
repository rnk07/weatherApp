import dotenv from "dotenv"

import express from "express"
import weatherRoutes from "./routes/weather.js"

dotenv.config(); //Load .env file
const PORT = process.env.PORT;

const app = express();
app.use(express.json()); //Middleware to parse json

// Mount Weather Routes
app.use("/weather",weatherRoutes);


// Sever Start
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
    
})