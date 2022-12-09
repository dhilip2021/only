const express = require("express");
const mongoose = require("mongoose");
const app = express();
const env = require("dotenv");
const cors = require("cors");
env.config();

const adminRoutes = ("./routes/auth");

mongoose.set('strictQuery', true);
const connectionUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.20nwetd.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
mongoose.connect(connectionUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(()=>{
    console.log('DB Connected')
});

app.use(cors());
app.use(express.json());


app.use("/api/v1",adminRoutes)

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"welcome our site"
    })
    
})

app.listen(`${process.env.PORT}`,()=>{
    console.log(`server start our port ${process.env.PORT}`);
})