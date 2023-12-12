import React, { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Default color
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const addNote = () => {
    if (noteInput.trim() !== "") {
      if (editingNoteIndex !== null) {
        // If editing, update the existing note
        const updatedNotes = notes.map((note, index) =>
          index === editingNoteIndex
            ? { ...note, text: noteInput, color: selectedColor }
            : note
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
    setSelectedColor(notes[index].color);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          style={{
            backgroundColor: "#ffffff",
            border: selectedColor === "#ffffff" ? "2px solid black" : "none",
          }}
        ></button>
        <button
          onClick={() => changeColor("#ffcccb")}
          style={{
            backgroundColor: "#ffcccb",
            border: selectedColor === "#ffcccb" ? "2px solid black" : "none",
          }}
        ></button>
        <button
          onClick={() => changeColor("#ccffcc")}
          style={{
            backgroundColor: "#ccffcc",
            border: selectedColor === "#ccffcc" ? "2px solid black" : "none",
          }}
        ></button>
        <button
          onClick={() => changeColor("#cce6ff")}
          style={{
            backgroundColor: "#cce6ff",
            border: selectedColor === "#cce6ff" ? "2px solid black" : "none",
          }}
        ></button>
        <button
          onClick={() => changeColor("#ce4257")}
          style={{
            backgroundColor: "#ce4257",
            border: selectedColor === "#ce4257" ? "2px solid black" : "none",
          }}
        ></button>
      </div>

      {/* Search area */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search notes"
      />
      <div className="note-cards">
        {filteredNotes.map((note, index) => (
          <div
            key={index}
            className="note-card"
            style={{
              backgroundColor: note.color,
              border: selectedColor === note.color ? "2px solid black" : "none",
            }}
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
