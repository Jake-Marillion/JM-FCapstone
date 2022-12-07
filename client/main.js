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

//Logout Button TODO does not work.
document.querySelector(".logOut").addEventListener("click", function() {
    document.querySelectorAll(".currentUserId").id = "0"
    window.location.href = "../login.html"
});

//Close Edit Popup Button
document.querySelector(".closeEditButton").addEventListener("click", function() {
    document.querySelector(".editModal").style.display = "none"
});

//Update Button on Edit Commitment Popup
document.querySelector(".updateButton").addEventListener("click", function(e) {
    updateCommitment(e.target.id)
    document.querySelector(".editModal").style.display = "none"
});

//Delete Button on Edit Commitment Popup
document.querySelector(".deleteButton").addEventListener("click", function(e) {
    deleteCommitment(e.target.id)
    document.querySelector(".editModal").style.display = "none"
});

const allCommitments = document.querySelector(".allCommitments")
const currentUserId = document.querySelector(".currentUserId").id

//Code that makes HTML Commitments w red borders if date is past and green if not.
function makePastCommitmentCard(commitment) {
    const { id, name, date, amount, userId} = commitment
    const commitmentContainer = document.querySelector(".allCommitments")
    
    const pastCommitmentCard = document.createElement('div');
    pastCommitmentCard.className = "pastCommitment"
    pastCommitmentCard.id = userId;
    pastCommitmentCard.innerHTML =`
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
      </div>`

    //Down Arrow Button on Divs
    let clickedElementId = 0
    pastCommitmentCard.querySelector(".arrow").addEventListener("click", function () {
        clickedElementId = Event.AT_TARGET.p.id
        let { clickedElementId } = body
        // ^ would be the commitment id. 
        axios.get("/getClickedCommitment", body)

        .then(populateEditModal(res.data))
        .catch(err => console.log(err))

        document.querySelector(".editModal").style.display = "flex"
})

//Listen for complete to be clicked
pastCommitmentCard.querySelector(".complete").addEventListener("click", function(e) {
    markComplete()
})

    commitmentContainer.appendChild(pastCommitmentCard)
}
function makeCommitmentCard(commitment) {
    const { id, name, date, amount, userId} = commitment
    const commitmentContainer = document.querySelector(".allCommitments")

    const commitmentCard = 
    `<div id="${userId}" class="commitment">
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

//Code to get and filter/sort Commitments
function getAllCommitments() {
    //TODO this URL is hardcoded for user 1.  
    axios.get("http://localhost:3737/commitments/1")
    .then((res) => {
            let allCommitments = res.data
            const today = new Date()
        
            for(let i = 0; i < allCommitments.length; i++) {
                if (new Date(allCommitments[i].date) < today) {
                    makePastCommitmentCard(allCommitments[i]);
                } else {
                    makeCommitmentCard(allCommitments[i]);
                }
            }
        })
    .catch(err => console.log(err))
}

//Code to Create Commitments
function createCommitment() { 
    let name = document.querySelector(".nameInput").value;
    let date = document.querySelector(".dateInput").value;
    let amount = document.querySelector(".currencyInput").value;
    let notes = document.querySelector(".noteInput").value;
    let isPaid = false
    let userId = currentUserId

    let body = { name, date, amount, notes, isPaid, userId };
    axios.put("/createCommitment", body)

    .then(getAllCommitments())
    .catch(err => console.log(err))
}

//Code to Update Commitments 
function updateCommitment(clickedElementId) {
    let name = document.querySelector(".newNameInput").value;
    let date = document.querySelector(".newDateInput").value;
    let amount = document.querySelector(".newCurrencyInput").value;
    let notes = document.querySelector(".newNoteInput").value;

    let body = { name, date, amount, notes, clickedElementId, currentUserId }
    axios.post("/updateCommitment", body)

    .then(getAllCommitments())
    .catch(err => console.log(err))
}

//Code to mark a Commitment as Complete and remove it from the DOM.
function markComplete(commitmentId) {
//TODO how do I grab the classes of the commitment they grabbed to get their inputs..
//e.target.classname?
    let body = { commitmentId, currentUserId }

    axios.post("/markCommitmentComplete", body)

    .then(getAllCommitments())
    .catch(err => console.log(err))
}

//Code to Delete Commitments
function deleteCommitment(clickedElementId) {
    let body = { clickedElementId };

    axios.delete("/deleteCommitment", body)

    .then(getAllCommitments())
    .catch(err => console.log(err))
}

//Code to populate the Edit Popup
function populateEditModal(){
    let { name, date, amount, notes } = res.data
    document.querySelector(".newNameInput").input = name
    document.querySelector(".newDateInput").input = date
    document.querySelector(".newCurrencyInput").input = amount
    document.querySelector(".newNoteInput").input = notes
}

getAllCommitments()