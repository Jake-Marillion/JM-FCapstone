// const { mapFinderOptions } = require("sequelize/types/utils");
// Where did the above code come from?? TODO

//Login Button
document.getElementById("loginButton").addEventListener("click", function() {
    //TODO Hash and check login info.
    // if(info checks out){
    //     document.open(main.js);
    // } else {
    //     alert("Looks like you need to sign up with that info!");
    // }
});

//Forgot Password Button
document.querySelector(".pass").addEventListener("click", function() {
    document.querySelector(".forgotModal").style.display = "flex"
});

//Forgot Password Close Button
document.querySelector(".closeForgotButton").addEventListener("click", function() {
    document.querySelector(".forgotModal").style.display = "none"
});

//Forgot Password Send Email Button
document.querySelector(".sendButton").addEventListener("click", function() {
    //TODO code to send email with login info to the inputted email 
    // or to alert, error no account found with that email. 
    document.querySelector(".forgotModal").style.display = "none"
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
    //TODO add code to send confirmation email w login info if have time.
    //TODO trigger seed function with an example commitment or two?
    document.querySelector(".signupModal").style.display = "none"
});

//Code to Create Users
function createUsers(username, password, email) { 
    let username = document.querySelector(".usernameInput").value;
    let password = document.querySelector(".passwordInput").value;
    let email = document.querySelector(".emailInput").value;
    //TODO do I need to hash the password here?

    let { username, password, email } = body
    axios.post("http://localhost:3737/createUser", body)

    .then(getAllCommitments())
    .catch(err => console.log(err))
}