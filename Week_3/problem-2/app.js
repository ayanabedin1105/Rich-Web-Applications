let notesContainer = document.querySelector(".notes-container");
let createBtn = document.querySelector(".notes-btn");
let notes = document.querySelectorAll(".input-box");

// creating button
createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/trash-solid.svg";
  notesContainer.appendChild(inputBox).appendChild(img);
});

// Delete Button
notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
  }
});
