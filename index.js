const path = require("path")
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// ROUTES

const welcome = require("./routes/welcome");

// When we require the `express` package,
// we get a function in return that generates
// instances of an express app.
// We use this object to build a web server.
const app = express();
app.set("view engine", "ejs");

// MIDDLEWARE

// Http Request Logger
app.use(morgan("dev"));

// Static Assets
// Use path.join to combine strings into directory paths.
// Example: path.join("fotorol", "public") -> "fotorol/public"

// __dirname is a global variable available in Node. It gives the
// the full path, beginning from root of your computer, to the
// where __diname is being used.
console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, "public")))

// Cookie Parser
app.use(cookieParser());

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));

// Custom Middleware
app.use((request, response, next) => {
  // To read cookies, use `request.cookies`.
  // This is added by "cookie-parser". It contains
  // an object with cookie names as keys and their values.
  const username = request.cookies.username;
  console.log(request.cookies);

  response.locals.username = null;

  if (username) {
    // All properties of the `response.locals` object are
    // available as variables inside all templates that
    // our app renders.
    response.locals.username = username;
  }
  // When creating middleware, you must call next() when
  // your middleware has finished. This tells Express to call
  // the next middleware. If next() is never called, the client
  // will load forever, because Express will never send a response.
  next();
});

// Use `app.use` to connect a router to your app. When doing so,
// you can specify a path as a first argument. This path will
// be prefixed to all routes that are part of the connected router.
app.use("/", welcome);


const DOMAIN = "localhost";
const PORT = 3002;

app.listen(PORT, DOMAIN, () => {
  console.log(`💻 Server listenning on http://${DOMAIN}:${PORT}`);
});
