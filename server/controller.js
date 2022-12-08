require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {CONNECTION_STRING} = process.env;
const {PORT} = process.env;
const axios = require('axios').default;
const Sequelize = require('sequelize');
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
    const { id } = req.params;
    sequelize.query(`select * from commitments where isPaid=false and userid=${id} order by date asc;`)
    
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.get('/commitments/:id', getCommitments)

//Function to create commitments
const createCommitment = (req, res) => {
    let { name, date, amount, notes, isPaid, userId } = req.body
   
    sequelize.query(`insert into commitments (name, date, amount, isPaid, notes, userID) values (${name}, ${date}, ${amount}, ${isPaid}, ${notes}, ${userId};`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.post('/createCommitment', createCommitment)

//Function to update commitments
const updateCommitment = (req, res) => {
    let { name, date, amount, notes, commitmentId } = req.body

    sequelize.query(`update commitments set name=${name}, set date=${date}, set amount=${amount}, set notes=${notes} where ${commitmentId}=commitments.id;`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.post('/updateCommitment', updateCommitment)

//Function to mark commitments complete
const markCommitmentComplete = (req, res) => {
    let { commitmentId } = req.body

    sequelize.query(`update commitments set isPaid=true where ${commitmentId}=commitments.id;`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.post('/markCommitmentComplete', markCommitmentComplete)

//Function to delete commitments
const deleteCommitment = (req, res) => {
    let { clickedElementId } = req.body
    
    sequelize.query(`delete * from commitments where id=${clickedElementId};`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.delete('/deleteCommitment', deleteCommitment)

//Function to create users
const createUser = (req, res) => {
    let { username, password } = req.body

    sequelize.query(`insert into users (username, password) values (${username}, ${password});`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.put('/createUser', createUser)

//Funtion to check login info
const checkLogin = (req, res) => {
    
    sequelize.query(`select * from users;`)
    
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.get('/checkLogin', checkLogin)

//Functions to get Doughnut Values
const doughnutValues = (req, res) => {
    let { currentUserId } = req.body
    
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and isPaid = false;`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/getDoughnutValues', doughnutValues)

const totalValues = (req, res) => {
    let { currentUserId } = req.body
   let month = new Date().getMonth() + 1;
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date >= '2022-${month}-01' and date <= '2022-${month}-31';`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/getTotalValues', totalValues)

//Functions to get Bar Values
const getJanValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${+currentUserId} and date >= '2022-01-01' and date <= '2022-01-31';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/janValues', getJanValues)

const getFebValues = (req, res) => {
    console.log(req.body);
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date between '2022-02-01' and '2022-02-28';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/febValues', getFebValues)

const getMarValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date between '2022-03-01' and '2022-03-31';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/marValues', getMarValues)

const getAprValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date between '2022-04-01' and '2022-04-30';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/aprValues', getAprValues)

const getMayValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date between '2022-05-01' and '2022-05-31';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/mayValues', getMayValues)

const getJunValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date between '2022-06-01' and '2022-06-30';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/junValues', getJunValues)

const getJulValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date between '2022-07-01' and '2022-07-31';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/julValues', getJulValues)

const getAugValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date between '2022-08-01' and '2022-08-31';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/augValues', getAugValues)

const getSeptValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date between '2022-09-01' and '2022-09-30';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/septValues', getSeptValues)

const getOctValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date between '2022-10-01' and '2022-10-31';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/octValues', getOctValues)

const getNovValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date between '2022-11-01' and '2022-11-30';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/novValues', getNovValues)

const getDecValues = (req, res) => {
    let { currentUserId } = req.body
    sequelize.query(`select sum(amount) from commitments where userID = ${currentUserId} and date between '2022-12-01' and '2022-12-31';`)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
app.post('/decValues', getDecValues)

//Code to get info for Edit Popup
const getClickedCommitment = (req, res) => {
    let { commitmentId } = req.body

    sequelize.query(`select name, date, amount, notes from commitments where id = ${commitmentId};`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.post('/getClickedCommitment', getClickedCommitment)

//Function to check year and delete old paid commitments
function checkAndDelete() {
    const currentYear = 2022
    const yearCheck = new Date().getFullYear();

    if(yearCheck > currentYear) {
        sequelize.query(`delete * from commitments where isPaid=true;`)
        currentYear + 1
    }
}

//Code to set Current User Id in Database
const establishCurrentUser = (req, res) => {
    let { userId } = req.body

    sequelize.query(`delete * from currentUser then insert into currentUser (id) values (${userId});`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.put('/establishUser', establishCurrentUser)

//Code to get Current User Id
const getCurrentUser = (req, res) => {

    sequelize.query(`select * from currentUser;`)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}
//Endpoint
app.get('/getCurrentUserId', getCurrentUser)


checkAndDelete()

//Code to seed Admin User
app.post('/seed', (req, res) => {
    sequelize.query(`
    drop table if exists commitments;
    drop table if exists users;
    drop table if exists currentUser;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
    );
    
    CREATE TABLE commitments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        amount INT NOT NULL,
        isPaid BOOLEAN NOT NULL,
        notes VARCHAR(1000),
        userid INTEGER REFERENCES users(id)
    );

    CREATE TABLE currentUser (
        id INT
    );
    
    INSERT INTO users (username, password)
    VALUES ('adminaccount1', 'adminpassword1*');
    
    INSERT INTO commitments (name, date, amount, isPaid, notes, userID)
    VALUES ('Gas', '2022-01-10', 85.00, true, 'Gas up both cars.', 1),
    ('Sports', '2022-02-15', 105.50, false, 'Uniforms + Team Fees', 1),
    ('Rent', '2022-03-01', 1100.08, true, 'Pay at apartments.com.  Late on the 5th!', 1),
    ('Birthday', '2022-04-20', 6.70, true, 'She wanted a Lego Set this year.', 1),
    ('Groceries', '2022-05-05', 299.99, false, NULL, 1),
    ('Bike', '2022-06-11', 490.02, true, 'Cannondale Viking', 1),
    ('Phone', '2022-07-28', 669.66, true, 'On autopay.', 1),
    ('Vacation', '2022-08-19', 885.00, true, 'Need to make more specific plans this year.', 1),
    ('School', '2022-12-22', 505.00, true, 'Call 867-5309 to pay.', 1),
    ('Misc', '2022-12-12', 50.60, true, NULL, 1),
    ('Eating Out', '2022-12-17', 45.86, true, NULL, 1),
    ('Christmas', '2022-12-09', 300.80, false, NULL, 1);
`).then(() => res.sendStatus(200))
.catch((e) => res.status(500).send(e.message))
})

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
    getClickedCommitment,
    establishCurrentUser,
    getCurrentUser
}; 

app.listen(3737, () => console.log(`Server running on ${PORT}`));