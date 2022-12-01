let currentUserId = document.querySelector(".currentUserId").id;

//Sets Bar Graph Values
function setBarValues() {
    let thisYearsStats = []
    //TODO code to get and sort and push into array this years values.
    document.querySelector("data").data = thisYearsStats
}

//Sets Donut Graph Values
function setDonutValues() {
    let thisMonthUnpaidCommitments = 0
    let thisMonthPaidCommitments = 100 - thisMonthUnpaidCommitments
    //TODO code to get and sort and set this months values.
    document.querySelector("dataDoughnut").data = [thisMonthUnpaidCommitments, thisMonthPaidCommitments]
}

//Logout Button TODO does not work
document.querySelector(".logOut").addEventListener("click", function() {
    document.querySelectorAll(".currentUserId").id = "0"
    document.open("login.html")
});

setBarValues()
setDonutValues()