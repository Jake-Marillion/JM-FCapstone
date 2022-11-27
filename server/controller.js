const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config()
const Sequelize = require("sequelize")
const app = express();
app.use(express.json());
app.use(cors())
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

const getBills = (req, res) => {

    sequelize.query("select * from bills where isPaid = 1 order by date desc;")

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.get("/bills", getBills)

//TODO fix/test these functions.  Backticks?
const createBill = (req, res) => {
    let { name, date, amount, notes } = req.body
    const isPaid = 1
    sequelize.query("insert into bills (name, date, amount, isPaid, notes) values (${name}, ${date}, ${amount}, ${isPaid}, ${notes};")
    //TODO do I need to call the getBills Function here? 
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post("/createBill", createBill)

const updateBill = (req, res) => {
    let { name, date, amount, notes } = req.body
    sequelize.query("update bills set name = ${name}, set date = ${date}, set amount = ${amount}, set isPaid = ${isPaid}, set notes = ${notes}, where id = i.innerHTML[id] TODO;")

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.put("/updateBill", updateBill)

const deleteBill = (req, res) => {
    sequelize.query("delete * from bills where id = ${req.body};")

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.delete("/deleteBill", deleteBill)

module.exports = {
    getBills,
    createBill,
    updateBill,
    deleteBill
}

app.listen(3737, () => console.log("Server running on 3737"));