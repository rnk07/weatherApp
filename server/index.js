import express from "express"


const app = express();
const port = 9000;


// Sever Start
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})