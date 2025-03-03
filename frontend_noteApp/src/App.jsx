import noteServices from "./services/notes";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import Note from "./components/Note";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showAll, SetShowAll] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [count, setCount] = useState(0);

  //render note content for setNote state hook from database
  const infoPull = () => {
    const request = noteServices.getAll();
    return request.then((response) => {
      setNotes(response);
    });
  };

  //doesnt render anything if notes is still null

  useEffect(() => {
    infoPull();
  }, []);

  //update server data
  const updateData = (id, obj) => {
    noteServices.update(id, obj);
  };

  // function to toggle an important property value and update it
  const toggleImportance = (id) => {
    const note = notes.find((note) => note.id === id);
    const updatedNote = { ...note, important: !note.important };

    updateUI(updatedNote);
    updateData(id, note);

    // noteServices
    //   .update(id, updatedNote)
    //   .then((response) => {
    //     setNotes(notes.map((note) => (note.id !== id ? note : response)));
    //   })
    //   .catch((error) => {
    //     console.log(`update note Error: ${error}}`);
    //     setAlertMessage(
    //       `Note ${note.content} was already removed from the server`
    //     );
    //     setTimeout(() => {
    //       setAlertMessage(null);
    //     }, 5000);
    //     setNotes(notes.filter((n) => n.id !== id));
    //   });
  };

  //form button click handler
  const addNotes = (event) => {
    event.preventDefault();
    console.log("button form clicked", event.target);

    if (!newNote) {
      setAlertMessage("value needed");
      setTimeout(() => {
        setAlertMessage(null);
      }, 2000);
      return;
    }

    const newNoteObj = {
      content: newNote,
      id: String(notes.length + 1),
      important: Math.random() > 0.5,
    };

    noteServices.add(newNoteObj);
    setNotes(notes.concat(newNoteObj));
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
        <span>
          <h1>VITE</h1> <h1>REACT</h1>
        </span>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div className="card"></div>
        <p className="read-the-docs">Data sourcing and manipulation</p>
      </div>
      <div>
        <h1 className="headNote">NOTES</h1>
        <button
          onClick={() => {
            SetShowAll(!showAll);
          }}
        >
          {showAll ? "all notes" : "some notes"}
        </button>
        <Alert message={alertMessage} />
        <div>
          <ul>
            {!notes ? (
              <p>Loading...</p>
            ) : (
              notes.map((note) => (
                <Note
                  note={note}
                  key={note.id}
                  toggleImportance={toggleImportance}
                />
              ))
            )}
          </ul>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
