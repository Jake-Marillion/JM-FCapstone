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
    createCommitment(name, date, amount, notes, userId)
    document.querySelector(".popModal").style.display = "none"
});

//Logout Button TODO does not work.
document.querySelector(".logOut").addEventListener("click", function() {
    document.querySelectorAll(".currentUserId").id = "0"
    document.open("login.html")
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

const allCommitments = document.querySelector(".allCommitments")
const currentUserId = document.querySelector(".currentUserId").id

//Code that makes HTML Commitments w red borders if date is past and green if not.
function makeCommitmentCard(commitment) {
    const { id, name, date, amount, userId} = commitment

    const commitmentCard = 
    `<div id="${userId} class="commitment">
    <p id="${id} class="commitmentName">${name}</p>
    <p class="commitmentAmount">${amount}</p>
    <p>DUE ON</p>
    <p class="commitmentDate">${date}</p>
      <div class="rightCommitmentSection">
        <select class="paidSelector" name="paidSelector" id="paidSelector">
          <option value="incomplete">incomplete</option>
          <option class="complete" value="complete">complete</option>
        </select>
        <i" class="arrow down"></i>
      </div>
    </div>`

    const pastCommitmentCard = 
    `<div id="${userId} class="pastCommitment">
    <p id="${id}" class="commitmentName">${name}</p>
    <p class="commitmentAmount">${amount}</p>
    <p>DUE ON</p>
    <p class="commitmentDate">${date}</p>
      <div class="rightCommitmentSection">
        <select class="paidSelector" name="paidSelector" id="paidSelector">
          <option value="incomplete">incomplete</option>
          <option class="complete" value="complete">complete</option>
        </select>
        <i class="arrow down"></i>
      </div>
    </div>`
    
    //TODO I don't think line 90 works for the for loop on line 95.  I think it needs to count the responses objects.
    let allCommitments = document.querySelectorAll(".commitment")
    const commitmentContainer = document.querySelector(".allCommitments")
    const today = new Date()

    for(let i = 0; i < allCommitments.length; i++) {
        if (date[i] < today) {
            commitmentContainer.appendChild(pastCommitmentCard)
        } else {
            commitmentContainer.appendChild(commitmentCard)
        }
    }
}
function getAllCommitments() {
    axios.get("http://localhost:3737/commitments")
    .then(res => {
        res.data.forEach(commitment => {
            const commitmentCard = makeCommitmentCard(commitment)
//TODO is this nesecary with the above if statement?  Should the if statement go here? 
//Because this doesn't take into account past bills as currently is.
            allCommitments.innerHTML += commitmentCard
        })
    })
    .catch(err => console.log(err))
}

//Code to Create Commitments
function createCommitment(name, date, amount, isPaid, notes, userId) { 
    let name = document.querySelector(".nameInput").value;
    let date = document.querySelector(".dateInput").value;
    let amount = document.querySelector(".currencyInput").value;
    let notes = document.querySelector(".noteInput").value;
    let isPaid = 1
    let userId = currentUserId

    let { name, date, amount, notes, isPaid, userId } = body
    axios.put("http://localhost:3737/createCommitment", body)

    .then(getAllCommitments())
    .catch(err => console.log(err))
}

//Code to Update Commitments TODO
function updateCommitment(name, date, amount, notes, commitmentId) {
    let name = document.querySelector(".newNameInput").value;
    let date = document.querySelector(".newDateInput").value;
    let amount = document.querySelector(".newCurrencyInput").value;
    let notes = document.querySelector(".newNoteInput").value;
    //TODO how do I grab the commitmentId of the one they clicked on??

    let { name, date, amount, notes, commitmentId } = body
    axios.post("http://localhost:3737/updateCommitment", body)

    .then(getAllCommitments())
    .catch(err => console.log(err))
}

//Code to mark a Commitment as Complete and remove it from the DOM.
function markComplete(commitmentId, date, amount, userId) {
    //TODO how do I grab the commitmentId, date, amount, and userId of what was clicked?
    let isPaid = 0
    let { commitmentId, date, amount, userId } = body
    //TODO Put or Post?  Or both with 2 endpoints??
    axios.post("http://localhost:3737/markCommitmentComplete", body)
    .then(getAllCommitments())
    .catch(err => console.log(err))
}

//Code to Delete Commitments TODO
function deleteCommitment(commitmentId) {
    //TODO how do I grab the commitmentId of what was brought up?
    let { commitmentId } = body
    axios.delete("http://localhost:3737/deleteCommitment", body)
    .then(getAllCommitments())
    .catch(err => console.log(err))
}

getAllCommitments()