require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {CONNECTION_STRING} = process.env;
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
    let { name, date, amount, notes, commitmentId, userId } = req.body
    
    sequelize.query(`update commitments set name = ${name}, set date = ${date}, set amount = ${amount}, set notes = ${notes}, where ${commitmentId}=commitments.id AND ${userId}=commitments.userId;`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.post("/updateCommitment", updateCommitment)

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
app.post("/markCommitmentComplete", markCommitmentComplete)

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
    let { username, password } = req.body

    sequelize.query(`insert into users (username, password) values (${username}, ${password});`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.put("/createUser", createUser)

//Funtion to check login info
const checkLogin = (req, res) => {
    
    sequelize.query(`select * from users;`)
    
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.get("/checkLogin", checkLogin)

//Function to check year and delete old paid
function checkAndDelete() {
    const currentYear = 2022
    const yearCheck = new Date().getFullYear();

    if(yearCheck > currentYear) {
        sequelize.query(`delete * from paidCommitments;`)
        currentYear + 1
    }
}

//Functions to get Doughnut Values
const doughnutValues = (req, res) => {
    let { currentUserId } = req.body
    
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId};`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/getDoughnutValues", doughnutValues)

const totalValues = (req, res) => {
    let { currentUserId } = req.body
   
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId};`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/getTotalValues", totalValues)

//Functions to get Bar Values
const getJanValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %01-00 and %01-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/janValues", getJanValues)

const getFebValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %02-00 and %02-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/febValues", getFebValues)

const getMarValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %03-00 and %03-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/marValues", getMarValues)

const getAprValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %04-00 and %04-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/aprValues", getAprValues)

const getMayValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %05-00 and %05-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/mayValues", getMayValues)

const getJunValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %06-00 and %06-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/junValues", getJunValues)

const getJulValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %07-00 and %07-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/julValues", getJulValues)

const getAugValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %08-00 and %08-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/augValues", getAugValues)

const getSeptValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %09-00 and %09-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/septValues", getSeptValues)

const getOctValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %10-00 and %10-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/octValues", getOctValues)

const getNovValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %11-00 and %11-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/novValues", getNovValues)

const getDecValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments and paidCommitments where userID = ${currentUserId} and where date between %12-00 and %12-32;`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.get("/decValues", getDecValues)

//Code to get info for Edit Popup
const getClickedCommitment = (req, res) => {
    let { commitmentId } = req.body

    sequelize.query(`select name, date, amount, notes from commitments where id = ${commitmentId};`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.get("/getClickedCommitment", getClickedCommitment)

checkAndDelete()

module.exports = {
    getCommitments,
    createCommitment,
    updateCommitment,
    markCommitmentComplete,
    deleteCommitment,
    createUser,
    checkLogin,
    doughnutValues,
    totalValues,
    getJanValues,
    getFebValues,
    getMarValues,
    getAprValues,
    getMayValues,
    getJunValues,
    getJulValues,
    getAugValues,
    getSeptValues,
    getOctValues,
    getNovValues,
    getDecValues,
    getClickedCommitment
}; 

app.listen(3737, () => console.log("Server running on 3737"));