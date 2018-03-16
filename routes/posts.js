const express = require("express");
// When requiring a directory, node will look
// for a file named "index.js" inside of it and
// will require that file instead.
// const knex = require("../db/index");
const knex = require("../db");
const router = express.Router();

// Post#new URL: /posts/new METHOD: GET
// Displays a form to create a post
router.get("/new", (req, res) => {
  res.render("posts/new");
});

// Post#create URL: /posts METHOD: POST
// Receives data from a form and creates post from it
router.post("/", (req, res) => {
  const description = req.body.description;
  const pictureUrl = req.body.pictureUrl;
  const username = req.cookies.username;

  // knex.insert takes object where every
  // key-value pair corresponds to a column from the
  // table being inserted into.
  knex
    .insert({
      description: description,
      pictureUrl: pictureUrl,
      username: username
    })
    .into("posts")
    .then(() => {
      // Db queries with knex are asynchronous like
      // setTimeout or setInterval. If you want to write
      // code that depends on a result from a query,
      // you must write it inside this callback (or the callback
      // passed to the .then method.)
      res.redirect("/posts")
    });
});

// Post#index URL: /posts METHOD: GET
// A listing of all posts from our posts table
router.get("/", (req, res) => {
  knex
    .select("*")
    .from("posts")
    .orderBy("createdAt", "DESC")
    .then(
      // The callback given to .then is called by
      // knex once the query is complete. When called,
      // it's given the query results as argument.
      // You can name that argument whatever you want.
      posts => {
        res.render("posts/index", {posts: posts});
      }
    )
});

// Post#show PATH: /posts/:id METHOD: GET
// Display an individual post from the db by their "id"
router.get("/:id", (req, res) => {
  // Paths that have `:` in front of a name will store
  // that part of the path in req.params where the name will
  // the key and the matching part of the path will its value.
  // /posts/99 -> req.params === {id: "99"}
  // /posts/some_stuff -> req.params === {id: "some_stuff"}
  const postId = req.params.id;

  if (isNaN(parseInt(postId, 10))) {
    return res.redirect("/");
  }

  knex
    .select("*")
    .from("posts")
    .where({id: postId})
    .limit(1)
    .then(([post]) => {
      // 👆 Array destructuring in arguments
      // Works as examples below, but also works on arguments.
      res.render("posts/show", {post: post});
    })
})

// Destructuring Arrays

// Example in Node:
// > const a = [1,2,3,4]
// undefined
// > a
// [ 1, 2, 3, 4 ]
// > let [first, second, ...rest] = a
// undefined
// > first
// 1
// > second
// 2
// > rest
// [ 3, 4 ]
// > let [,,third] = a
// undefined
// > third
// 3
// >










module.exports = router;
