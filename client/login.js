//Login Button
document.getElementById("loginButton").addEventListener("click", function(e) {
    e.preventDefault()
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
function createUsers() { 
    let username = document.querySelector(".usernameInput").value;
    let password = document.querySelector(".passwordInput").value;

    let body = { username, password }
    axios.post("http://localhost:3737/createUser", body)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}

//Code to Check Login Info
async function checkLogin() { 
    let username = document.querySelector(".loginUsernameInput").value;
    let password = document.querySelector(".loginPasswordInput").value;
    console.log(password)
    console.log(username)
    try{
        let { data: userArray } = await axios.post("http://localhost:3737/checkLogin", {username, password});
        window.location.href = "./main.html"
    } catch(e){
        alert('please check credentials and try again');
    }
}
