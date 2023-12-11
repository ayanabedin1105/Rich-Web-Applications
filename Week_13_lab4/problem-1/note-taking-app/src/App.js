import React, { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Default color
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);

  const addNote = () => {
    if (noteInput.trim() !== "") {
      if (editingNoteIndex !== null) {
        // If editing, update the existing note
        const updatedNotes = notes.map((note, index) =>
          index === editingNoteIndex ? { ...note, text: noteInput } : note
        );
        setNotes(updatedNotes);
        setEditingNoteIndex(null);
      } else {
        // If not editing, add a new note
        setNotes([...notes, { text: noteInput, color: selectedColor }]);
      }
      setNoteInput("");
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const changeColor = (color) => {
    setSelectedColor(color);
  };

  const startEditingNote = (index) => {
    setEditingNoteIndex(index);
    setNoteInput(notes[index].text);
  };

  return (
    <div className="App">
      <h1>Note Taking App</h1>
      <div>
        <input
          type="text"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Enter your note"
        />
        <button onClick={addNote}>
          {editingNoteIndex !== null ? "Save Edit" : "Add Note"}
        </button>
        <button onClick={() => setEditingNoteIndex(null)}>Cancel Edit</button>
      </div>
      <div className="color-selector">
        <span>Change Note Color:</span>
        <button
          onClick={() => changeColor("#ffffff")}
          style={{ backgroundColor: "#ffffff" }}
        ></button>
        <button
          onClick={() => changeColor("#ffcccb")}
          style={{ backgroundColor: "#ffcccb" }}
        ></button>
        <button
          onClick={() => changeColor("#ccffcc")}
          style={{ backgroundColor: "#ccffcc" }}
        ></button>
        <button
          onClick={() => changeColor("#cce6ff")}
          style={{ backgroundColor: "#cce6ff" }}
        ></button>
      </div>
      <div className="note-cards">
        {notes.map((note, index) => (
          <div
            key={index}
            className="note-card"
            style={{ backgroundColor: note.color }}
          >
            <textarea
              value={note.text}
              onChange={(e) => {}}
              rows="4"
              cols="30"
              readOnly={editingNoteIndex !== index}
              onClick={() => startEditingNote(index)}
            />
            <div className="note-actions">
              <button onClick={() => deleteNote(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
