//import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL
}));

app.use("/",(req, res)=>{
    res.send("Test Route");
});


//start the express server
app.listen(PORT,()=>{
    console.log(`Future Forge AI Application started and listening on ${PORT}.`);
});