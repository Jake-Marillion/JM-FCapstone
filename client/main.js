//Add Commitment Button
document.getElementById("addButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "flex"
});

//Close Button on Add Commitment Popup
document.querySelector(".closeButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "none"
});

//Submit Button on Add Commitment Popup
document.querySelector(".submitButton").addEventListener("click", function() {
    createCommitment(innerHTML)
    document.querySelector(".popModal").style.display = "none"
});

//Logout Button
document.querySelector(".logOut").addEventListener("click", function() {
    //TODO add code here to log user out.
});

//TODO all below do not work.
//Down Arrow Button on Divs
document.querySelector(".arrow").addEventListener("click", function () {
    //TODO set contents equal to contents of sql object w that id.
    document.querySelector(".editModal").style.display = "flex"
})

//Close Edit Popup Button
document.querySelector(".closeEditButton").addEventListener("click", function() {
    document.querySelector(".editModal").style.display = "none"
});

//Update Button on Edit Commitment Popup
document.querySelector(".updateButton").addEventListener("click", function() {
    updateCommitment(innerHTML)
    document.querySelector(".editModal").style.display = "none"
});

//Delete Button on Edit Commitment Popup
document.querySelector(".deleteButton").addEventListener("click", function() {
    deleteCommitment(innerHTML)
    document.querySelector(".editModal").style.display = "none"
});

//Listen for complete to be clicked
document.querySelector(".complete").addEventListener("click", function() {
    markComplete()
    //TODO add code here to set the display value of the commitment to none?
    //Or will removing it from the backend table do that?
})

const allBills = document.querySelector(".allCommitments")

//Code that makes HTML Commitments w red borders if date is past and green if not.
function makeCommitmentCard(commitment) {
    const { id, name, date, amount} = commitment

    const commitmentCard = 
    `<div class="commitment">
    <p class="commitmentName">${name}</p>
    <p class="commitmentAmount">${amount}</p>
    <p>DUE ON</p>
    <p class="commitmentDate">${date}</p>
      <div class="rightCommitmentSection">
        <select class="paidSelector" name="paidSelector" id="paidSelector">
          <option value="incomplete">incomplete</option>
          <option class="complete" value="complete">complete</option>
        </select>
        <i id="${id}" class="arrow down"></i>
      </div>
    </div>`

    const pastCommitmentCard = 
    `<div class="pastCommitment">
    <p class="commitmentName">${name}</p>
    <p class="commitmentAmount">${amount}</p>
    <p>DUE ON</p>
    <p class="commitmentDate">${date}</p>
      <div class="rightCommitmentSection">
        <select class="paidSelector" name="paidSelector" id="paidSelector">
          <option value="incomplete">incomplete</option>
          <option class="complete" value="complete">complete</option>
        </select>
        <i id="${id}" class="arrow down"></i>
      </div>
    </div>`
    
    let allCommitments = document.querySelectorAll(".commitment")
    const today = new Date()

    //TODO does this if statement work??
    for(let i = 0; i < allCommitments.length; i++) {
        if (date[i] < today) {
            return pastCommitmentCard
        } else {
            return commitmentCard
        }
    }
}
function getAllCommitments() {
    axios.get("http://localhost:3737/commitments")
    .then(res => {
        res.data.forEach(commitment => {
            const commitmentCard = makeCommitmentCard(commitment)
            allCommitments.innerHTML += commitmentCard
        })
    })
    .catch(err => console.log(err))
}

//Code to Create Commitments TODO
function createCommitment(req, res) {
    // const { name, date, amount, notes } = req.params?

    axios.post("http://localhost:3737/createCommitment")

    .catch(err => console.log(err))
}

//Code to Update Commitments TODO
function updateCommitment(req, res) {
    // const { name, date, amount, notes } = req.params IS THIS LINE NEEDED?

    axios.put("http://localhost:3737/updateCommitment")

    .catch(err => console.log(err))
}

//Code to mark a Commitment as Complete and remove it from the display.
function markComplete() {
    // const { name, date, amount, notes } = req.params?
    //Put or Post?  Or both with 2 endpoints??
    axios.put("http://localhost:3737/markCommitmentComplete")

    .catch(err => console.log(err))
}

//Code to Delete Commitments TODO
function deleteCommitment(req, res) {
    // const { id } = req.body(i.innerHTML[id])?

    axios.delete("http://localhost:3737/deleteCommitment")

    .catch(err => console.log(err))
}

getAllCommitments()