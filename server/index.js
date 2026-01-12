import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import weatherRoutes from "./routes/weather.js"

dotenv.config(); //Load .env file
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json()); //Middleware to parse json

// Mount Weather Routes
app.use("/weather",weatherRoutes);


// Sever Start
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
    
})