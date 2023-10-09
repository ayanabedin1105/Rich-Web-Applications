let notesContainer = document.querySelector(".notes-container");
let createBtn = document.querySelector(".notes-btn");
let notes = document.querySelectorAll(".input-box");

// Colors
var red = document.getElementById("red");
var blue = document.getElementById("blue");
var green = document.getElementById("green");

//function for colors
red.addEventListener("click", function () {
  setColor("#f00");
});

blue.addEventListener("click", function () {
  setColor("#00f");
});
green.addEventListener("click", function () {
  setColor("rgb(92, 233, 92)");
});

function setColor(color) {
  document.execCommand("styleWithCSS", false, true);
  document.execCommand("foreColor", false, color);
}

//function to check if localstorage already exists
function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}

showNotes();
// setColor();

//create Local Storage
function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

updateStorage();

// creating button
createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/trash-solid.svg";
  notesContainer.appendChild(inputBox).appendChild(img);
  notesContainer.setColor();
});

// Delete Button
notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((nt) => {
      nt.onkeyup = function () {
        updateStorage();
      };
    });
  }
});

// function to prevent line break
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    document.execCommand("insertLineBreak");
    e.preventDefault();
  }
});
