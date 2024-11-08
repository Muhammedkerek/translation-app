const express = require("express");
const app = express();


app.get("/home" , (req,res)=>{
    res.send("hamud is here")
})





module.exports = app;