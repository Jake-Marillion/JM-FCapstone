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

//Down Arrow Button on Divs
document.querySelector(".arrow").addEventListener("click", function () {
    //TODO set contents equal to contents of sql object from commitments with that id.
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
})

const allCommitments = document.querySelector(".allCommitments")
const currentUserId = document.querySelector(".currentUserId").id

//Code that makes HTML Commitments w red borders if date is past and green if not.
function makePastCommitmentCard(commitment) {
    const { id, name, date, amount, userId} = commitment
    const commitmentContainer = document.querySelector(".allCommitments")

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

    commitmentContainer.innerHTML += pastCommitmentCard;
}
function makeCommitmentCard(commitment) {
    const { id, name, date, amount, userId} = commitment
    const commitmentContainer = document.querySelector(".allCommitments")

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
    
    commitmentContainer.innerHTML += commitmentCard;
}
function getAllCommitments() {
    axios.get("http://localhost:3737/commitments")
    .then((res) => {
            let allCommitments = res.data
            const today = new Date()
        
            for(let i = 0; i < allCommitments.length; i++) {
                if (date[i] < today) {
                    makePastCommitmentCard(allCommitments[i]);
                } else {
                    makeCommitmentCard(allCommitments[i]);
                }
            }
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
//TODO how to grab the id of what was brought up.

    let { name, date, amount, notes, commitmentId } = body
    axios.post("http://localhost:3737/updateCommitment", body)

    .then(getAllCommitments())
    .catch(err => console.log(err))
}

//Code to mark a Commitment as Complete and remove it from the DOM.
function markComplete(commitmentId, date, amount, userId) {
//TODO how do I grab the classes of the commitment they grabbed.
    let isPaid = 0
    let { commitmentId, date, amount, userId } = body
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