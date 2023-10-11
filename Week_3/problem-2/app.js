let isEditing = false;
let currentEditNote = null;

// function to change color of notes
function changeColor() {
  const colorPicker = document.getElementById("colorPicker");
  const notes = document.getElementById("notes");

  notes.style.backgroundColor = colorPicker.value;
}

// function to add/ update notes
function addOrUpdateNote() {
  const noteText = document.getElementById("notes").value;

  if (isEditing) {
    if (currentEditNote) {
      const note = currentEditNote.querySelector("p");
      note.innerText = noteText;
      isEditing = false;
      currentEditNote = null;
      document.getElementById("notes").value = ""; // Clear the textarea after editing
      document.querySelector("#add-update-button").textContent = "Add Note"; // Reset button text
    }
  } else {
    if (noteText.trim() !== "") {
      const note = document.createElement("div");
      note.classList.add("note");
      note.style.backgroundColor = document.getElementById("notes").style.backgroundColor;
      note.innerHTML = `
              <p>${noteText}</p>
              <button onclick="editNote(this)">Edit</button>
              <button onclick="deleteNote(this)">Delete</button>
          `;
      document.body.appendChild(note);
      document.getElementById("notes").value = "";
    }
  }
}

//function to editNote
function editNote(button) {
  const note = button.parentNode;
  const noteText = note.querySelector("p").innerText;
  document.getElementById("notes").value = noteText;
  isEditing = true;
  currentEditNote = note;
  document.querySelector("#add-update-button").textContent = "Update Note"; // Change button text to "Update Note"
}

// Deleting note
function deleteNote(button) {
  const note = button.parentNode;
  note.remove();
}

// document.getElementById("notes").addEventListener("input", function () {
//   if (currentEditNote) {
//     currentEditNote.innerText = this.value;
//   }
// });
