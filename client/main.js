//Add Committment Button and Form Code.
//TODO does not work.
document.getElementById("addButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "flex"
});

document.querySelector(".closeButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "none"
});

document.getElementById("submitButton").addEventListener("click", function() {
    document.querySelector(".popModal").style.display = "none"
    //TODO add data push here.
});