let currentUserId = document.querySelector(".currentUserId").id;

//Sets Bar Graph Values
function setBarValues() {
    let body = currentUserId
    let thisYearsStats = []
    //TODO code to sort res.data by month.

    axios.get("http://localhost:3737/valuesAndDates", body)
    .then((res) => {
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