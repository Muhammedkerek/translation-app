const express = require("express");
const app = express();
const translatorRouter = require("./Routes/translaterRoute");


app.get("/home" , (req,res)=>{
    res.send("hamud is here")
})


app.use(express.static(`${__dirname}/starter/public`))


app.use(express.json());

app.use("/api/vocalapp" , translatorRouter);



module.exports = app;