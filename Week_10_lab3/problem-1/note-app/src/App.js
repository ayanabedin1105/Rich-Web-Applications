import logo from "./logo.svg";
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

  const addNote = () => {
    if (noteInput.trim() !== "") {
      setNotes([...notes, noteInput]);
      setNoteInput("");
    }
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

        <buttton onClick={addNote}>Add Note</buttton>
      </div>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
