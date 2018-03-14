const express = require('express');

// When we require the `express` package,
// we get a function in return that generates
// instances of an express app.
// We use this object to build a web server.
const app = express();

// PARTS OF A URL

// URL http://www.example.com/home/
// scheme  | host           | path

// The "scheme" identifies the protocol being used. This
// is typically HTTP or HTTPS.

// The "host" identifies the domain that holds the server.

// The "path" identifies the specific resource we want to
// access on the server.

// This tells our app to respond to a GET request.
// Only if that request is that path of "/home".
// When a GET request is made to "/home", the callback
// is called. Inside of it, this is where we write the
// code that will create the response to the client.

// The name of method, get, identifies this as a response
// to a GET request. This is the HTTP verb often called the
// method. Most interactions in browser cause a GET request
// to be made to a server (e.g. clicking a link, typing
// a url in the address bar, etc.)
app.get("/home", (request, response) => {
  // The `request` argument is object that represents
  // the request being by a client to server. It contains
  // everything that is needed to respond to the client.

  // The `response` argument is object that represents
  // the server's reply to the client. We are response
  // for the building and sending it.
  response.send("Hello, World!");
});

const DOMAIN = "localhost";
const PORT = 3002;

app.listen(PORT, DOMAIN, () => {
  console.log(`💻 Server listenning on http://${DOMAIN}:${PORT}`);
});
