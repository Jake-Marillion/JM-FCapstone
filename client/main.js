//Add Committment Button, Input Form, Update Form, and Logout Button.
//TODO need something to check if the date of the bill has passed and change the border color to red.
document.getElementById("addButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "flex"
});
document.querySelector(".closeButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "none"
});
document.querySelector(".submitButton").addEventListener("click", function() {
    createBill(innerHTML)
    document.querySelector(".popModal").style.display = "none"
});
document.querySelector(".logOut").addEventListener("click", function() {
    //TODO add code here to log user out.
});
//TODO all below do not work.
document.querySelector(".arrow").addEventListener("click", function () {
    //TODO set contents equal to contents of sql object w that id.
    document.querySelector(".editModal").style.display = "flex"
})
document.querySelector(".closeEditButton").addEventListener("click", function() {
    document.querySelector(".editModal").style.display = "none"
});
document.querySelector(".updateButton").addEventListener("click", function() {
    updateBill(innerHTML)
    document.querySelector(".editModal").style.display = "none"
});
document.querySelector(".deleteButton").addEventListener("click", function() {
    deleteBill(innerHTML)
    document.querySelector(".editModal").style.display = "none"
});

const allBills = document.querySelector(".allBills")

//Code that makes HTML Bills.
function makeBillCard(bill) {
    const { id, name, date, amount} = bill
    
    const billCard = 
    `<div class="bill">
    <p class="billName">${name}</p>
    <p class="billAmount">${amount}</p>
    <p>DUE ON</p>
    <p class="billDate">${date}</p>
      <div class="rightBillSection">
        <select class="paidSelector" name="paidSelector" id="paidSelector">
          <option value="incomplete">incomplete</option>
          <option value="complete">complete</option>
        </select>
        <i id="${id}" class="arrow down"></i>
      </div>
    </div>`

    return billCard
}
function getAllBills() {
    axios.get("http://localhost:3737/bills")
    .then(res => {
        res.data.forEach(bill => {
            const billCard = makeBillCard(bill)
            allBills.innerHTML += billCard
        })
    })
    .catch(err => console.log(err))
}

//Code to Create Bills TODO
function createBill(req, res) {
    // const { name, date, amount, notes } = req.params IS THIS LINE NEEDED?

    axios.get("http://localhost:3737/createBill")

    .catch(err => console.log(err))
}

//Code to Update Bills TODO
function updateBill(req, res) {
    // const { name, date, amount, notes } = req.params IS THIS LINE NEEDED?

    axios.get("http://localhost:3737/updateBill")

    .catch(err => console.log(err))
}

//Code to Delete Bills TODO
function deleteBill(req, res) {
    // const req.body = i.innerHTML[id]

    axios.get("http://localhost:3737/deleteBill")

    .catch(err => console.log(err))
}

getAllBills()