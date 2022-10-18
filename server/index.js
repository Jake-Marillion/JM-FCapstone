const express = require("express");
const cors = require("cors");
//const dotenv = require("dotenv").config()
//const Sequelize = require("sequelize")
const app = express();

app.use(express.json());
app.use(cors())




app.listen(3737, () => console.log("Server running on 3737"));