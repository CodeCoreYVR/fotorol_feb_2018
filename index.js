const express = require('express');
const morgan = require('morgan');

// When we require the `express` package,
// we get a function in return that generates
// instances of an express app.
// We use this object to build a web server.
const app = express();
app.set("view engine", "ejs");

app.use(morgan("dev"));

// PARTS OF A URL

// URL http://www.example.com/contact_us/?fullName=Steve+Godin&message=+What+is+up%3F
// scheme  | host           | path      | query string


// The "query" string is way to data in the URL. Data formatted
// uses URL encoding.
// ?fullName=Steve+Godin&message=+What+is+up%3F
// ? indicates that a query string is beginning
// In "fullName=Steve+Godin", fullName is the key and
// Steve+Godin is a value. Key-value are seperated by =.
// Then, key-value pairs are seperated by `&`.

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
  response.send("Welcome at CodeCore! 💻");
});

// URL: http://localhost:3000/ METHOD: GET
app.get("/", (request, response) => {
  // response.render can be used render the contents
  // of a template file.  Express expects all templates
  // to be inside of the "/views" director.
  // As a first argument, pass the path the template
  // ignore the "/views" directory.
  response.render("index");
});

app.get("/contact_us", (request, response) => {
  // To access data in the query string of a url, use
  // property "query" of request. request.query will
  // have a JavaScript converted from the query string.
  console.log(request.query);

  const fullName = request.query.fullName;
  const message = request.query.message;

  // To create local variables inside of templates, pass
  // an object as a second argument to response.render().
  // All key-values of that object will become variables inside
  // of the template where its keys will be the variable names.
  response.render(
    "contact_us",
    {
      sample: "My Sample!",
      fullName: fullName,
      message: message
    }
  );
});

const DOMAIN = "localhost";
const PORT = 3002;

app.listen(PORT, DOMAIN, () => {
  console.log(`💻 Server listenning on http://${DOMAIN}:${PORT}`);
});
