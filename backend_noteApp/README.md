## Running the Backend Program

//... Setup the package.json file scripts field
{
// ...
"scripts": {
"start": "node index.js",
"test": "echo \"Error: no test specified\" && exit 1"
},
// ...
}

//... Create an index.js file in the root of the projects backend directory

## Start Running the progam with node command

node index.js

## Start Running the program with an npm script

npm start

//... when the project does NOT have a test library, npm start wont do anything other than return the test error code: "echo \"Error: no test specified\" && exit 1"

## Express

//... Easier library to use to create code directly on Node built in web server; http.

Enable via;
npm install express

## Nodemon

//... starting application with nodemon to implement auto restart of the applicaiton as we update/crete changes

node_modules/.bin/nodemon index.js

The command above is tedious, so let's define an npm script for it in the package.json file :

{
// ..
"scripts": {
"start": "node index.js",
"dev": "nodemon index.js",
"test": "echo \"Error: no test specified\" && exit 1"
},
// ..
}

There is no need to use the full path to nodemon in the script,
node_modules/.bin/nodemon,
as npm can automatically look for the executable file in that directory.

We can now start the server in application development mode with the command

npm run dev

## REST

Used to implement RESTful HTTP interface like json-server.
Let's assume that the root address of our service is www.example.com/api .

If we name notes as note resources, we will identify a single note with the ID 10 at the URL www.example.com/api/notes/10 .

The URL for the collection resource representing all notes is www.example.com/api/notes .

Various operations can be performed on resources. The operation to be performed is defined by the HTTP operation type, often also called a verb :

URL verb functionality
notes/10 GET retrieves a single resource
notes GET retrieves all resources in the collection
notes POST creates a new resource from the data included in the request
notes/10 DELETE delete an individual resource
notes/10 PUT replaces the specified resource with the data included in the request
notes/10 PATCH replaces part of the identified resource with the data included in the request
This roughly defines what REST calls a uniform interface , i.e. a somewhat uniform way of defining interfaces that enable (with certain refinements) the interoperability of systems.

## To better access sent data with POST requests use JSON Parser thats provided by Express.

//... Add this to code block in index.js file to enable the JSON parser;

app.use((express.json));

## Different Origins

In short, in our context, it's this: JavaScript code running in a web application's browser is, by default, only allowed to communicate with a server on the same origin . Since the server is on port 3001 on localhost and the frontend is on port 5173 on localhost, their origins are not the same.

It should be emphasized that same origin policy and CORS are not React or Node-specific issues, but universal principles for how web applications work.
We can allow requests from other origins using Node's CORS middleware.
We can allow requests from other origins using Node's CORS middleware.

Installed in the backend with the cors command

//... npm install cors

Let's implement the middleware for now with a configuration that allows requests from all origins to all Express routes in the backend:

const cors = require('cors')

app.use(cors())
