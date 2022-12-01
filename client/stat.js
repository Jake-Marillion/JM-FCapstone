let currentUserId = document.querySelector(".currentUserId").id;

//Sets Bar Graph Values
function setBarValues() {
    let thisYearsStats = []
    //TODO code to get and sort and push into array this years values.
    document.querySelector("data").data = thisYearsStats
}

//Sets Donut Graph Values TODO does this work?
function setDonutValues() {
    let thisMonthUnpaidCommitments = 50
    let thisMonthPaidCommitments = 50
    let body = currentUserId
    let totalMoney = 0

    axios.get("http://localhost:3737/getTotalValues", body)
    .then(res => res.data => {
        totalMoney = res.data 
        })

    axios.get("http://localhost:3737/getDoughnutValues", body)
    .then(res => res.data => {
        thisMonthPaidCommitments = res.data * 100 / totalMoney
        thisMonthUnpaidCommitments = 100 - thisMonthPaidCommitments 
        })
    document.querySelector("dataDoughnut").data = [thisMonthUnpaidCommitments, thisMonthPaidCommitments]
    .catch(err => console.log(err))
}

//Logout Button TODO does not work in this or main.js/html
document.querySelector(".logOut").addEventListener("click", function() {
    document.querySelectorAll(".currentUserId").id = "0"
    document.open("login.html")
});

setBarValues()
setDonutValues()