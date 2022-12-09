const express = require("express");
const app = express();
const env = require("dotenv");


env.config();

app.listen(`${process.env.PORT}`,()=>{
    console.log(`server start our port ${process.env.PORT}`);
})