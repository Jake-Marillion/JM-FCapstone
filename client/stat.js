let currentUserId = document.querySelector(".currentUserId").id;

//Sets Bar Graph Values
function setBarValues() {
    let body = currentUserId
    let thisYearsStats = []

    axios.get("http://localhost:3737/janValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("http://localhost:3737/febValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("http://localhost:3737/marValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("http://localhost:3737/aprValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("http://localhost:3737/mayValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("http://localhost:3737/junValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("http://localhost:3737/julValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("http://localhost:3737/augValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("http://localhost:3737/septValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("http://localhost:3737/octValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("http://localhost:3737/novValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("http://localhost:3737/decValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })

    document.querySelector("data").data.value = thisYearsStats
}

//Sets Donut Graph Values TODO does this work?
function setDonutValues() {
    let thisMonthUnpaidCommitments = 50
    let thisMonthPaidCommitments = 50
    let body = currentUserId
    let totalMoney = 0

    axios.get("http://localhost:3737/getTotalValues", body)
    .then((res) => {
        //TODO res.data may be an array
        console.log(res.data)
        totalMoney = res.data 
        })

    axios.get("http://localhost:3737/getDoughnutValues", body)
    .then((res) => {
        //TODO res.data may be an array
        console.log(res.data)
        thisMonthPaidCommitments = res.data * 100 / totalMoney
        thisMonthUnpaidCommitments = 100 - thisMonthPaidCommitments 
        })
    document.querySelector("dataDoughnut").data = [thisMonthUnpaidCommitments, thisMonthPaidCommitments]
    .catch(err => console.log(err))
}

document.querySelector(".logOut").addEventListener("click", function() {
    document.querySelectorAll(".currentUserId").id = "0"
    document.open("login.html")
});

setBarValues()
setDonutValues()