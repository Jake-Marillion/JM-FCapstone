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

//TODO fix these functions
// const createBill = (req, res) => {
//     let { name, date, amount, isPaid, notes } = req.body
//     sequelize.query("insert into bills (name, date, amount, isPaid, notes) values (${name}, ${date}, ${amount}, ${isPaid}, ${notes};")
//     .then(dbRes => res.status(200).send(dbRes[0]))
//     .catch(err => console.log(err))
// }

// const updateBill = (req, res) => {
//     let { name, date, amount, isPaid, notes } = req.body

//     sequelize.query("update bills set name = ${name} set date = ${date} set amount = ${amount} set isPaid = ${isPaid} set notes = ${notes} where TODO;")

//     .then(dbRes => res.status(200).send(dbRes[0]))
//     .catch(err => console.log(err))
// }

// const deleteBill = (req, res) => {
//     let { name, date, amount, isPaid, notes } = req.body

//     sequelize.query("TODO = ${name} set date = ${date} set amount = ${amount} set isPaid = ${isPaid} set notes = ${notes} where TODO;")

//     .then(dbRes => res.status(200).send(dbRes[0]))
//     .catch(err => console.log(err))
// }


module.exports = {
    getBills,
    createBill,
    updateBill,
    deleteBill
}

app.listen(3737, () => console.log("Server running on 3737"));