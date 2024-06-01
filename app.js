const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const connectMongodb = require("./init/mongodb")

// init app
const app = express();

// connect database
connectMongodb()

// third-party middleware
app.use(express.json({limit : "500mb"}));
app.use(bodyParser.urlencoded({limit : "500mb", extended : true}));

module.exports = app;