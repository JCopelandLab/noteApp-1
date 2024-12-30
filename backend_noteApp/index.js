//
// data
let notes = [
  {
    id: "1",
    content: "HTML is wack",
    important: false,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are methods of HTTP protocol",
    important: false,
  },
  {
    id: "4",
    content: "JavaScript is cool",
    important: false,
  },
  {
    id: "5",
    content: "Testing code with Postmon",
    important: false,
  },
  {
    id: "6",
    content: "Docker is a Tool",
    important: false,
  },
  {
    id: "7",
    content: "Web Dev is baseline",
    important: false,
  },
  {
    id: "8",
    content: "WebDev",
    important: false,
  },
  {
    id: "9",
    content: "Web Dev is entry",
    important: false,
  },
  {
    id: "10",
    content: "be better",
    important: false,
  },
];

// simple web server
const express = require("express");
const app = express();
app.use(express.json());

// middleware cors
const cors = require("cors");
app.use(cors());

//
// get default text
app.get("/", (request, response) => {
  response.send("<h1>Hello There, backend here!</h1>");
});
//
// get all resources
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// get specific resource; id
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const foundNote = notes.find((note) => note.id === id);

  if (foundNote) {
    response.json(foundNote);
  } else {
    response
      .send({ item: "previously deleted or never existed" })
      .status(404)
      .end();
  }
});

// specific resource deletion
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response
    .send({ success: `item id: ${id} removed.` })
    .status(204)
    .end();
});

// add resources
app.post("/api/notes", (request, response) => {
  const body = request.body;

  const genId = () => {
    const maxId =
      notes.length > 0 ? Math.min(...notes.map((note) => Number(note.id))) : 0;

    return String(maxId + 1);
  };

  if (!body.content) {
    return response.status(400).json({
      error: "content is missing",
    });
  }

  const newNote = {
    content: body.content,
    important: body.important || false,
    id: genId(),
  };

  console.log(newNote, " :new note");
  response.json(newNote);
});

//update existing item
app.put("/api/notes/:id", (request, response) => {
  const id = request.params.id;

  const note = notes.find((note) => note.id === id);

  const updatedNote = { ...note, important: !note.important };

  response.send(updatedNote);
  // assign update into data on button click
});

//connection
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
