//workaround to connect to mongodb server.
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

//import dependency
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

console.log("inside mongo db connection");

db.on("connected",()=>console.log("database has been connected."));
db.on("disconnected",()=>console.log("database has been disconnected"));
db.on("error",(err)=>console.error("database connection failed.",err));


module.exports = db;