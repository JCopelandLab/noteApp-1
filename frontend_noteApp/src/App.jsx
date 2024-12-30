import noteServices from "./services/notes";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Alert from "./components/Alert";
import Footer from "./components/Footer";
import Note from "./components/Note";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState(null);
  const [showAll, SetShowAll] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [alertMessage, setAlertMessage] = useState("error response");

  //render note content for setNote state hook from database
  useEffect(() => {
    noteServices.getAll().then((response) => {
      console.log("Data: ", response);
      setNotes(response);
    });
  }, []);

  //dont render anything if notes is still null
  if (!notes) return null;

  // toggle list view based on importance values; true - false
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  // toggle individual note importance
  const toggleImportance = (id) => {
    const url = `http://localhost:3001/api/notes/${id}`;
    const note = notes.find((i) => i.id === id);
    const changedNote = { ...note, important: !note.important };

    noteServices
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setAlertMessage(
          `Note ${note.content} was already removed from the server`
        );
        setTimeout(() => {
          setAlertMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  //form button click handler
  const addnotes = (event) => {
    event.preventDefault();
    console.log("button form clicked", event.target);

    const newNoteObj = {
      content: newNote,
      id: String(notes.length + 1),
      important: Math.random() > 0.5,
    };

    noteServices.create(newNoteObj).then((returnedNote) => {
      console.log("response of adding new note", returnedNote);
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  // inputfield change event handler
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <>
      <div>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
      <div>
        <h1 className="headNote">NOTES</h1>
        <Alert message={alertMessage} />
        <div>
          <button
            onClick={() => {
              SetShowAll(!showAll);
            }}
          >
            show {showAll ? "importnat" : "all"}
          </button>
        </div>
        <form onSubmit={addnotes}>
          <input
            value={newNote}
            onChange={handleNoteChange}
            placeholder="..."
          />
          <button type="submit">Save</button>
        </form>

        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportance(note.id)}
            />
          ))}
        </ul>
        <Footer />
      </div>
    </>
  );
}

export default App;
