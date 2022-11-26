//Add Committment Button, Input Form, Update Form, and Logout Button.
//TODO need something to check if the date of the bill has passed and change the border color to red.
document.getElementById("addButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "flex"
});
document.querySelector(".closeButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "none"
});
document.querySelector(".submitButton").addEventListener("click", function() {
    //TODO add data push here or call to sql insert function.
    document.querySelector(".popModal").style.display = "none"
});
document.querySelector(".logOut").addEventListener("click", function() {
    //TODO add code here to log user out.
});
//TODO does not work.
document.querySelector(".arrow down").addEventListener("click", function () {
    document.querySelector(".editModal").style.display = "flex"
    //TODO set contents equal to contents of sql object w that id.
})
document.querySelector(".closeEditButton").addEventListener("click", function() {
    document.querySelector(".editModal").style.display = "none"
});
document.querySelector(".updateButton").addEventListener("click", function() {
    //TODO add data push here or call to sql update function.
    document.querySelector(".editModal").style.display = "none"
});
document.querySelector(".deleteButton").addEventListener("click", function() {
    //TODO add data push here or call to sql delete function.
    document.querySelector(".editModal").style.display = "none"
});

const allBills = document.querySelector(".allBills")



//Code that makes HTML Bills.
function makeBillCard(client) {
    const { id, name, date, amount} = client
    
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
        res.data.forEach(client => {
            const billCard = makeBillCard(client)
            allBills.innerHTML += billCard
        })
    })
    .catch(err => console.log(err))
}



getAllBills()