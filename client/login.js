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
    console.log(password)
    console.log(username)

    let { data: userArray } = await axios.get("/checkLogin");

    for(let i = 0; i < userArray.length; i++) {
        if(userArray[i].username === username && userArray[i].password === password){
            login(userArray[i].id)
        } else {
            alert("User not found!");
        }
    }
    async function login(userId) {
    let body = { userId }

    axios.put("/establishUser", body)

    window.location.href = "../main.html"
    // or await window.location.assign("../main.html")?

    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
    }
}
