const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require("cors");
env.config();
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"welcome our site"
    })
    
})

app.listen(`${process.env.PORT}`,()=>{
    console.log(`server start our port ${process.env.PORT}`);
})