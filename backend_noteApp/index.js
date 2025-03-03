//
// data
let notes = [
  {
    id: "1",
    content: "backend data",
    important: false,
  },
  {
    id: "2",
    content: "Browser connect to backend, this is backend data",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST backend data",
    important: false,
  },
  {
    id: "4",
    content: "JavaScript to backend",
    important: false,
  },
  {
    id: "5",
    content: "Testing backend on Postman",
    important: false,
  },
  {
    id: "6",
    content: "Docker to backend",
    important: false,
  },
  {
    id: "7",
    content: "Web Dev backend",
    important: false,
  },
  {
    id: "8",
    content: "WebDev backend",
    important: false,
  },
  {
    id: "9",
    content: "backend",
    important: false,
  },
  {
    id: "10",
    content: "be better backend",
    important: false,
  },
];

// simple web server
const express = require("express");
const app = express();
app.use(express.static("dist"));

// middleware
const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

// middleware cors
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(requestLogger);

//resource URL
const baseUrl = "/notes";

// generate resource id
const genId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

// get all resources
app.get(baseUrl, (req, res) => {
  res.json(notes);
  return;
});

// get specific resource; id
app.get(`${baseUrl}/:id`, (req, res) => {
  const id = Number(req.params.id);
  const foundNote = notes.find((note) => note.id === id);

  if (foundNote) {
    return res.json(foundNote);
  } else {
    return res.json({ ERROR: `Note ${id}, not found.` }).end();
  }
});

// specific resource deletion
app.delete(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// add resources
app.post(baseUrl, (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(404).json({ "Content Error": "CONTENT REQUIRED" });
  }

  const newNote = {
    content: body.content,
    important: body.important || false,
    id: genId(),
  };

  notes = notes.concat(newNote);
  console.log("Added: ", newNote);
  response.json(newNote);
});

//update existing item
app.patch(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id);

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
