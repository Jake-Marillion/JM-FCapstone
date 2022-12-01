// const { mapFinderOptions } = require("sequelize/types/utils");
//const { checkLogin } = require("../server/controller");
// Where did the above code come from?? TODO
const bcrypt = require("bcrypt");
const axios = require("axios").default;

//Login Button
document.getElementById("loginButton").addEventListener("click", function() {
    checkLogin()
});

//Signup Button
document.querySelector(".signup_link").addEventListener("click", function() {
    document.querySelector(".signupModal").style.display = "flex"
});

//Signup Close Button
document.querySelector(".closeSignupButton").addEventListener("click", function() {
    document.querySelector(".signupModal").style.display = "none"
});

//Confirm Button
document.querySelector(".signupButton").addEventListener("click", function() {
    createUsers()
    //TODO trigger seed function with an example commitment or two?
    document.querySelector(".signupModal").style.display = "none"
});

//Code to Create Users
function createUsers(username, password) { 
    let username = document.querySelector(".usernameInput").value;
    let password = bcrypt.hashSync(document.querySelector(".passwordInput").value);

    let { username, password } = body
    axios.put("http://localhost:3737/createUser", body)

    .then(getAllCommitments())
    .catch(err => console.log(err))
}

//Code to Check Login Info
function checkLogin(username, password) { 
    let username = document.querySelector(".loginUsernameInput").value;
    let password = bcrypt.hashSync(document.querySelector(".loginPasswordInput").value);

    axios.get("http://localhost:3737/checkLogin")
    let userArray = [resp.data]

    for(let i = 0; i < userArray.length; i++) {
        if(userArray[i].username === username && userArray[i].password === password){
            document.open(main.js);
            //TODO set a class in main.html to the usersId at userArray[i]?  Would need to add id to all gets and queries.
        } else {
            alert("User not found!");
        }
    }
    //.catch(err => console.log(err))
}