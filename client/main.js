//Add Committment Button, Input Form, and Logout Button.
//TODO need something to check if the date of the bill has passed and change the border color to red.
document.getElementById("addButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "flex"
});
document.querySelector(".closeButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "none"
});
document.querySelector(".submitButton").addEventListener("click", function() {
    //TODO add data push here or call to server push function.
    document.querySelector(".popModal").style.display = "none"
});
document.querySelector(".logOut").addEventListener("click", function() {
    //TODO add code here to log user out.
});

const allBills = document.querySelector(".allBills")

function makeBillCard(client) {
    const { id, name, date, amount, notes} = client
    
    const billCard = 
    `<div id="${id}" class="bill">
    <p class="billName">${name}</p>
    <p class="billAmount">${amount}</p>
    <p>DUE ON</p>
    <p class="billDate">${date}</p>
      <div class="rightBillSection">
        <select class="paidSelector" name="paidSelector" id="paidSelector">
          <option value="incomplete">incomplete</option>
          <option value="complete">complete</option>
        </select>
        <i class="arrow down"></i>
      </div>
    </div>`

    return billCard
}
function getAllBills() {
//TODO how does this only call the bills that I call in the controller.js getBills function?
    axios.get("http://localhost:3737/bills")
    .then(res => {
        res.data.forEach(client => {
            const billCard = makeBillCard(client)
            allBills.innerHTML += billCard
        })
    })
    .catch(err => console.log(err))
}

getAllBills()