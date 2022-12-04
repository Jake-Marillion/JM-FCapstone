let currentUserId = document.querySelector(".currentUserId").id;

//Sets Bar Graph Values
function setBarValues() {
    let body = currentUserId
    let thisYearsStats = []

    axios.get("/janValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("/febValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("/marValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("/aprValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("/mayValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("/junValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("/julValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("/augValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("/septValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("/octValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("/novValues", body)
    .then((res) => {
        thisYearsStats(res.data)
    })
    axios.get("/decValues", body)
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

    axios.get("/getTotalValues", body)
    .then((res) => {
        //TODO res.data may be an array
        console.log(res.data)
        totalMoney = res.data 
        })

    axios.get("/getDoughnutValues", body)
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
    window.location.href = "../login.html"
});

setBarValues()
setDonutValues()