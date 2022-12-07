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
function createUsers() { 
    let username = document.querySelector(".usernameInput").value;
    let password = bcrypt.hashSync(document.querySelector(".passwordInput").value);

    let body = { username, password }
    axios.put("/createUser", body)

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
}

//Code to Check Login Info
async function checkLogin() { 
    let username = document.querySelector(".loginUsernameInput").value;
    let password = bcrypt.hashSync(document.querySelector(".loginPasswordInput").value);

    let { data: userArray } = await axios.get("/checkLogin");

    for(let i = 0; i < userArray.length; i++) {
        if(userArray[i].username === username && userArray[i].password === password){
            document.querySelectorAll(".currentUserId").id = `${userArray[i].id}`
            window.location.href = "../main.html"
        } else {
            alert("User not found!");
        }
    }
}