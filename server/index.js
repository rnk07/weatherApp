import express from "express"
import weatherRoutes from "./routes/weather.js"

const app = express();
app.use(express.json()); //Middleware to parse json
const port = 9000;

// Mount Weather Routes
app.use("/weather",weatherRoutes);


// Sever Start
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})