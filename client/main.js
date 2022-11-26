//Add Committment Button and Form Code.
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


function makeBillCard(client) {
    const name = client["name"]
    const date = client["date"]
    const amount = client["amount"]
    const notes = client["notes"]
    const isPaid = "incompelete"

    const billCard = 
    '<div class="bill">
    <p class="billName">${name}</p>
    <p class="billAmount">${amount}</p>
    <p class="dueOn">DUE ON</p>
    <p class="billDate">${date}</p>
      <div class="rightBillSection">
        <select class="paidSelector" name="paidSelector" id="paidSelector">
          <option value="incomplete">incomplete</option>
          <option value="complete">complete</option>
        </select>
        <i class="arrow down"></i>
      </div>
    </div>'

    return billCard
}

function getAllBills() {
    axios.get("http://localhost:8765/clients")
    .then(res => {
        res.data.forEach(client => {
            const billCard = makeBillCard(client)
//TODO figure out how to add to bottom of div with the class of all bills.
            clientList.innerHTML += billCard
        })
    })
    .catch(err => console.log(err))
}

getAllBills()