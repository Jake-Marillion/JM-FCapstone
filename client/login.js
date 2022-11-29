//Login Button
document.getElementById("loginButton").addEventListener("click", function() {
    //TODO check to see if they have signed up else allert "Looks like you need to signup"
    //Hash and check login info.
    //TODO link to their main.html if pass check.
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
    //TODO code to send email with login info to the inputted email or to allert error no email found. 
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
    //TODO add code to push info to back end and confirmation email w login info.
    document.querySelector(".signupModal").style.display = "none"
});