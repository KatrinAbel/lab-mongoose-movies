const express = require('express');
const router  = express.Router();
const Movie = require('../models/movies');

/* GET movies */
router.get("/index", (req, res, next) => {
  Movie.find() 
  .then(movieData => 
    res.render("movies/index", {movieData})
    )
  // .catch(err => console.log("celebrity error"), err)
})

/* GET movie detail page */
router.get("/index/:id", (req, res, next) => {
  let id = req.params.id
  // console.log("id", req.params.id)
  Movie.findById(id)
  .then (movData =>
    res.render("movies/show", {movData})
  )
  // .catch(err => console.log("celeb error"), err)
})

/* GET new movie page */
router.get('/new', (req, res, next) => {
  res.render('movies/new');
});

/* POST handle new movie form */
router.post("/new", (req, res, next) => {
  // Define sources for new object
  const {title, genre, plot} = req.body
  // Create new object based on form input and model
  const addedMovie = new Movie ({title, genre, plot})
  addedMovie.save() 
  .then(newMovie => 
    res.redirect("/movies/index"))
  .catch( err =>
    console.log("error add", err)
    //res.redirect("/celebrities/new")
    ) 
})

/* POST delete movies */
// In redirect path specify destination with / at beginning
router.post("/:id/delete", (req, res, next) =>
//let id = req.params.id
Movie.findByIdAndRemove(req.params.id)
.then (removedMovie => 
  res.redirect("/movies/index")
)
.catch( err =>
  console.log("error remove", err)
)
)

/* GET edit movies page */
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id
  Celebrity.findById(id)
  .then(editCeleb => 
    res.render('movies/edit', {editCeleb}));
});

/* POST edit existing movies */
router.post("/:id", (req, res, next) => {
let id = req.params.id
const {name, occupation, catchphrase} = req.body
// Create new object based on form input and model
// const editedCeleb = new Celebrity ({name, occupation, catchphrase})
// Celebrity.findByIdAndUpdate(id, {editedCeleb})
Celebrity.findByIdAndUpdate(id, {
  name: req.body.name,
  occupation: req.body.occupation,
  catchphrase: req.body.catchphrase
})
.then(updateCeleb => (
  res.redirect("/movies/index")
  //console.log(updateCeleb)
))
})

module.exports = router;