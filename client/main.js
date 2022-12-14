//Code to get and set current user variable
let currentUserId = 0
const BASE_URL = 'http://localhost:3737'

//Add Commitment Button
document.getElementById("addButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "flex"
});

//Close Button on Add Commitment Popup
document.querySelector(".closeButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "none"
});

//Submit Button on Add Commitment Popup
document.querySelector(".submitButton").addEventListener("click", function(e) {
    e.preventDefault()
    createCommitment()
    document.querySelector(".popModal").style.display = "none"
});

//Logout Button.
document.querySelector(".logOut").addEventListener("click", function() {
    window.location.href = "./login.html"
});

//Close Edit Popup Button
document.querySelector(".closeEditButton").addEventListener("click", function() {
    document.querySelector(".editModal").style.display = "none"
});

//Update Button on Edit Commitment Popup
document.querySelector(".updateButton").addEventListener("click", function(e) {
    e.preventDefault()
    const updateID = document.querySelector(".updateDeleteButtons").id
    updateCommitment(updateID)
    document.querySelector(".editModal").style.display = "none"
});

//Delete Button on Edit Commitment Popup
document.querySelector(".deleteButton").addEventListener("click", function(e) {
    e.preventDefault()
    const deleteID = document.querySelector(".updateDeleteButtons").id
    deleteCommitment(deleteID)
    document.querySelector(".editModal").style.display = "none"
});

const allCommitments = document.querySelector(".allCommitments")
let clickedElementId = 0

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
    <select class="paidSelector" name=${id} id="paidSelector">
    <option value="incomplete">incomplete</option>
    <option class="complete" value="complete">complete</option>
    </select>
    <i class="arrow down"></i>
    </div>`
    
    //Down Arrow Button on Divs
    pastCommitmentCard.querySelector(".arrow").addEventListener("click", function () {
        populateEditModal(id)
    })
    
    //Listen for complete to be clicked
    pastCommitmentCard.querySelector(".paidSelector").addEventListener("change", function(e) {
        clickedElementId = e.target.name
        markComplete(clickedElementId)
    })
    
    commitmentContainer.appendChild(pastCommitmentCard);
}
function makeCommitmentCard(commitment) {
    const { id, name, date, amount, userId} = commitment
    const commitmentContainer = document.querySelector(".allCommitments")
    const commitmentCard = document.createElement('div');
    commitmentCard.id = userId;
    commitmentCard.className = 'commitment';
    commitmentCard.innerHTML =
    `
    <p id="${id} class="commitmentName">${name}</p>
    <p class="commitmentAmount">${amount}</p>
    <p>DUE ON</p>
    <p class="commitmentDate">${date}</p>
    <div class="rightCommitmentSection">
    <select class="paidSelector" name=${id} id="paidSelector">
    <option value="incomplete">incomplete</option>
    <option class="complete" value="complete">complete</option>
    </select>
    <i" class="arrow down"></i>
    </div>`

    //Down Arrow Button on Commitments
    commitmentCard.querySelector(".arrow").addEventListener("click", function () {
        populateEditModal(id)
    })
    
    //Listen for complete to be clicked
    commitmentCard.querySelector(".paidSelector").addEventListener("change", function(e) {
        clickedElementId = e.target.name
        markComplete(clickedElementId)
    })
    
    commitmentContainer.appendChild(commitmentCard);
}

//Code to get and filter/sort Commitments
function getAllCommitments() {
    axios.get(`http://localhost:3737/commitments/${currentUserId}`)
    .then((res) => {
            let allCommitments = res.data
            const today = new Date()
            document.querySelector(".allCommitments").innerHTML = '';
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
    axios.post(`${BASE_URL}/createCommitment`, body)
    .then(() => {
        document.querySelector(".nameInput").value = ''
        document.querySelector(".dateInput").value = ''
        document.querySelector(".currencyInput").value = ''
        document.querySelector(".noteInput").value = ''
        getAllCommitments}
        )
    .catch(err => console.log(err))
}

//Code to Update Commitments 
function updateCommitment(clickedElementId) {
    let name = document.querySelector(".newNameInput").value;
    let date = document.querySelector(".newDateInput").value;
    let amount = document.querySelector(".newCurrencyInput").value;
    let notes = document.querySelector(".newNoteInput").value;
    
    let body = { name, date, amount, notes, commitmentId: clickedElementId }
    axios.post(`${BASE_URL}/updateCommitment`, body)
    .then(getAllCommitments)
    .catch(err => console.log(err))
}

//Code to mark a Commitment as Complete and remove it from the DOM.
function markComplete(commitmentId) {
    let body = { commitmentId }
    
    axios.post(`${BASE_URL}/markCommitmentComplete`, body)
    
    .then(getAllCommitments)
    .catch(err => console.log(err))
}

//Code to Delete Commitments
function deleteCommitment(clickedElementId) {
    axios.delete(`${BASE_URL}/deleteCommitment/${clickedElementId}`)
    .then(getAllCommitments)
    .catch(err => console.log(err))
}

//Code to populate the Edit Popup
function populateEditModal(clickedElementId){
    
    let body = { commitmentId: clickedElementId };
    axios.post(`${BASE_URL}/getClickedCommitment`, body)
    .then(res => {
        document.querySelector(".editModal").style.display = "flex"
        
        let { name, date, amount, notes } = res.data[0];
        document.querySelector(".updateDeleteButtons").id = clickedElementId;
        document.querySelector(".newNameInput").value = name
        document.querySelector(".newDateInput").value = date
        document.querySelector(".newCurrencyInput").value = amount
        document.querySelector(".newNoteInput").value = notes
    })
}


function getCurrentUser() {

    axios.get(`${BASE_URL}/getCurrentUserId`)
    .then((res) => {
        currentUserId = res.data[0].id
        getAllCommitments()
    })
    .catch(err => console.log(err))
}
getCurrentUser()