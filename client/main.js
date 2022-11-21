const express = require("express");
const cors = require("cors");

//Need app . get code here for Cors and Express.

//Add Committment Button and Form Code.
//TODO does not work.
document.getElementById("addButton").addEventListener("click", function() {
    document.querySelector(".popModal").mainStyles.display = "flex"
});

document.querySelector(".closeButton").addEventListener("click", function() {
    document.querySelector(".popModal").mainStyles.display = "none"
});