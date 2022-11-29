const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const axios = require("axios").default;
const Sequelize = require("sequelize");
const app = express();
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

//Function to get commitments
const getCommitments = (req, res) => {

    sequelize.query("select * from commitments where isPaid = 1 order by date desc;")

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.get("/commitments", getCommitments)

//Function to create commitments TODO fix function - Backticks?
const createCommitment = (req, res) => {
    let { name, date, amount, notes } = req.body
    const isPaid = 1
    sequelize.query("insert into commitments (name, date, amount, isPaid, notes) values (${name}, ${date}, ${amount}, ${isPaid}, ${notes};")
    //TODO do I need to call the getCommitments Function here to reload my page? 
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.post("/createCommitment", createCommitment)

//Function to update commitments TODO fix function - Backticks?
const updateCommitment = (req, res) => {
    let { name, date, amount, notes } = req.body
    sequelize.query("update commitments set name = ${name}, set date = ${date}, set amount = ${amount}, set isPaid = ${isPaid}, set notes = ${notes}, where id = i.innerHTML[id] TODO;")

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.put("/updateCommitment", updateCommitment)

//Function to mark commitments complete TODO fix function - Backticks?
const markCommitmentComplete = (req, res) => {
    let { name, date, amount, notes } = req.body
    sequelize.query("insert into paidCommitments (date, amount) values (TIE TO ITEM FROM COMMITMENTS TABLE)")
    sequelize.query("delete * from commitments where id = ${req.body ? };")

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.put("/markCommitmentComplete", markCommitmentComplete)

//Function to delete commitments TODO fix function - Backticks?
const deleteCommitment = (req, res) => {
    sequelize.query("delete * from commitments where id = ${req.body};")

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.delete("/deleteCommitment", deleteCommitment)

module.exports = {
    getCommitments,
    createCommitment,
    updateCommitment,
    markCommitmentComplete,
    deleteCommitment
};

//TODO seed with an example commitment or two the first time they log in? 

app.listen(3737, () => console.log("Server running on 3737"));