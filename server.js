const dotenv = require("dotenv");
const app = require("./app");





const port = 8000;

app.listen(port , (req , res)=>{
    console.log("server is running")
})