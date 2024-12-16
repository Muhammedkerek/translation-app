require("dotenv").config();
// we use the dotenv package to access the config.env file which stores the critical information about the app
const app = require("./app");






const port = 5000;

app.listen(port , (req , res)=>{
    console.log("server is running")
})