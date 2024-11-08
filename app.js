const express = require("express");
const app = express();


app.get("/home" , (req,res)=>{
    res.send("hamud is here")
})



app.listen(8000 , (req,res)=>{
    console.log("server is running ")
})