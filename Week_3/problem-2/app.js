let currentEditNote = null;

// function to change color of notes
function changeColor() {
  const colorPicker = document.getElementById("colorPicker");
  const notes = document.getElementById("notes");

  notes.style.backgroundColor = colorPicker.value;
}

// function to add notes
function addNote() {
  let noteText = document.getElementById("notes").value;

  if (noteText.trim() !== "") {
    let note = document.createElement("p");
    note.style.backgroundColor = document.getElementById("notes").style.backgroundColor;
    note.classList.add("note"); //Add the "note" class
    // note.innerText = noteText;
    note.innerHTML = `
                    <p>${noteText}</p>
                    <button onClick="editNote(this)">Edit</button>
                    <button onclick="deleteNote(this)">Delete</button>
                `;
    document.body.appendChild(note);
    document.getElementById("notes").value = "";
  }
}

//function to editNote
function editNote(editButton) {
  let note = editButton.previousElementSibling;
  let noteText = note.innerText;
  document.getElementById("notes").value = noteText;
  currentEditNote = note;
}

// Deleting note
function deleteNote(button) {
  const note = button.parentNode;
  note.remove();
}

document.getElementById("notes").addEventListener("input", function () {
  if (currentEditNote) {
    currentEditNote.innerText = this.value;
  }
});
