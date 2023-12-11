import React, { useState, useEffect } from "react";
import "./App.css";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Default color
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);

  useEffect(() => {
    const addNote$ = new Subject();
    const deleteNote$ = new Subject();
    const editNote$ = new Subject();
    const colorChange$ = new Subject();

    const subscription = addNote$
      .pipe(map((note) => [...notes, note]))
      .subscribe((updatedNotes) => setNotes(updatedNotes));

    const deleteSubscription = deleteNote$
      .pipe(map((index) => notes.filter((_, i) => i !== index)))
      .subscribe((updatedNotes) => setNotes(updatedNotes));

    const editSubscription = editNote$
      .pipe(
        map(({ index, newText }) =>
          notes.map((note, i) =>
            i === index ? { ...note, text: newText } : note
          )
        )
      )
      .subscribe((updatedNotes) => setNotes(updatedNotes));

    const colorChangeSubscription = colorChange$.subscribe((color) =>
      setSelectedColor(color)
    );

    return () => {
      subscription.unsubscribe();
      deleteSubscription.unsubscribe();
      editSubscription.unsubscribe();
      colorChangeSubscription.unsubscribe();
    };
  }, [notes]);

  const addNote = () => {
    if (noteInput.trim() !== "") {
      if (editingNoteIndex !== null) {
        // If editing, update the existing note
        editNote(editingNoteIndex, noteInput);
        setEditingNoteIndex(null);
      } else {
        // If not editing, add a new note
        setNotes([...notes, { text: noteInput, color: selectedColor }]);
      }
      setNoteInput("");
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index, newText) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, text: newText } : note
    );
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
              onChange={(e) => editNote(index, e.target.value)}
              rows="4"
              cols="30"
              readOnly={editingNoteIndex !== index}
            />
            <div className="note-actions">
              <button onClick={() => deleteNote(index)}>Delete</button>
              <button onClick={() => startEditingNote(index)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
