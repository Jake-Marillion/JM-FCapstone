const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const axios = require("axios").default;
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt")
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

    sequelize.query(`select * from commitments where isPaid=1 and ${userId}=commitments.userID order by date desc;`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.get("/commitments", getCommitments)

//Function to create commitments
const createCommitment = (req, res) => {
    let { name, date, amount, notes, userId } = req.body
    const isPaid = 1
    sequelize.query(`insert into commitments (name, date, amount, isPaid, notes, userId) values (${name}, ${date}, ${amount}, ${isPaid}, ${notes}, ${userId};`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.post("/createCommitment", createCommitment)

//Function to update commitments
const updateCommitment = (req, res) => {
    let { name, date, amount, notes, commitmentId } = req.body
    sequelize.query(`update commitments set name = ${name}, set date = ${date}, set amount = ${amount}, set notes = ${notes}, where ${commitmentId}=commitments.id AND ${userId}=commitments.userId;`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.put("/updateCommitment", updateCommitment)

//Function to mark commitments complete
const markCommitmentComplete = (req, res) => {
    let { commitmentId, date, amount, userId } = req.body
    let isPaid = 0
    sequelize.query(`insert into paidCommitments (date, amount, isPaid, userId) values (${date}, ${amount}, ${isPaid}, ${userId});`)
    sequelize.query(`delete * from commitments where id=${commitmentId};`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.put("/markCommitmentComplete", markCommitmentComplete)

//Function to delete commitments
const deleteCommitment = (req, res) => {
    let { commitmentId } = req.body
    sequelize.query(`delete * from commitments where id=${commitmentId};`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.delete("/deleteCommitment", deleteCommitment)

//Function to create users
const createUser = (req, res) => {
    //TODO need to hash the pasword to send it here?
    let { username, password, email } = req.body

    sequelize.query(`insert into users (username, password, email) values (${username}, ${password}, ${email});`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.post("/createUser", createUser)

module.exports = {
    getCommitments,
    createCommitment,
    updateCommitment,
    markCommitmentComplete,
    deleteCommitment,
    createUser
}; 

app.listen(3737, () => console.log("Server running on 3737"));