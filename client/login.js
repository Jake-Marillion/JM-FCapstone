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
    document.querySelector(".signupModal").style.display = "none"
});

//Code to Create Users
function createUsers(username, password) { 
    let username = document.querySelector(".usernameInput").value;
    let password = bcrypt.hashSync(document.querySelector(".passwordInput").value);

    let { username, password } = body
    axios.put("http://localhost:3737/createUser", body)

    .then(dbRes => res.status(200).send(dbRes[0]))
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
            document.querySelector(".currentUserId").id = `${userArray[i].id}`
            document.open(main.js);
        } else {
            alert("User not found!");
        }
    }
    //.catch(err => console.log(err))
}