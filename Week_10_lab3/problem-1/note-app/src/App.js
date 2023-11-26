import React, { useState } from "react";
import "./App.css";

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  // variables for Note-App
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff"); //Default Color

  const addNote = () => {
    if (noteInput.trim() !== "") {
      setNotes([...notes, { text: noteInput, color: selectedColor }]);
      setNoteInput("");
    }
  };

  const changeColor = (color) => {
    setSelectedColor(color);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const editNote = (index, newText) => {
    const updatedNotes = [...notes];
    updatedNotes[index].text = newText;
    setNotes(updatedNotes);
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
        <button onClick={addNote}>Add Note</button>
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
        <button
          onClick={() => changeColor("#ce4257")}
          style={{ backgroundColor: "#ce4257" }}
        ></button>
      </div>

      <div className="note-cards">
        {notes.map((note, index) => (
          <div
            key={index}
            className="note-card"
            style={{ backgroundColor: note.color }}
          >
            {/* <p>{note.text}</p> */}
            <textarea
              value={note.text}
              onChange={(e) => editNote(index, e.target.value)}
              rows="4"
              cols="30"
            />

            <div className="note-actions">
              <button onClick={() => deleteNote(index)}>Delete</button>
              <button onClick={() => editNote(index, noteInput)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
      {/* <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
