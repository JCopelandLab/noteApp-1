import noteServices from "./services/notes";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import Note from "./components/Note";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (function () {
      try {
        noteServices.getAll().then((data) => {
          setNotes(data);
        });
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      }
    })();
  }, [notes]);

  //if no notes content DONT render
  if (!notes) {
    return null;
  }

  const addNote = (event) => {
    event.preventDefault();
    //notes isnt updating right away so id is copied
    const genId = () => {
      const id =
        notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 0;
      return String(id);
    };

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: genId(),
    };

    (function () {
      try {
        noteServices.create(noteObject).then((returned) => {
          setNotes(notes.concat(noteObject));
          console.log(returned);
        });
      } catch (error) {
        console.log(`Error creating: ${error}`);
      }
      setNewNote("");
    })();
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    console.log(note);
    const changedNote = { ...note, important: !note.important };

    noteServices
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(`Note Error: ${error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Alert message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id + note.content}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          required
          value={newNote}
          placeholder="..."
          onChange={handleNoteChange}
          minLength={6}
          maxLength={40}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
