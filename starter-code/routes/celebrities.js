const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movies');
const celebrityMovie = require("../models/celebrityMovie")

/* GET celebrities */
router.get("/index", (req, res, next) => {
  Celebrity.find() 
  .then(celebrityData => 
    res.render("celebrities/index", {celebrityData})
    )
  // .catch(err => console.log("celebrity error"), err)
})

/* GET celebrity detail page */
router.get("/index/:id", (req, res, next) => {
  let id = req.params.id
  /* console.log("id", req.params.id) */
  Celebrity.findById(id)
  .then (celebData =>
    res.render("celebrities/show", {celebData})
  )
  // .catch(err => console.log("celeb error"), err)
})

/* GET new celebrity page */
router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
});

/* POST handle new celebrity form */
router.post("/new", (req, res, next) => {
  // Define sources for new object
  const {name, occupation, catchphrase} = req.body
  // Create new object based on form input and model
  const addedCeleb = new Celebrity ({name, occupation, catchphrase})
  console.log(addedCeleb)
  addedCeleb.save() 
  .then(newCeleb => 
    res.redirect("/celebrities/index"))
  .catch( err =>
    console.log("error add", err)
    //res.redirect("/celebrities/new")
    ) 
})

/* POST delete celebrities */
// In redirect path specify destination with / at beginning
router.post("/:id/delete", (req, res, next) =>
//let id = req.params.id
Celebrity.findByIdAndRemove(req.params.id)
.then (removedCeleb => 
  res.redirect("/celebrities/index")
)
.catch( err =>
  console.log("error remove", err)
)
)

/* GET edit celebrity page */
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id
  Celebrity.findById(id)
  .then(editCeleb => 
    res.render('celebrities/edit', {editCeleb}));
});

/* GET add actor page */
router.get('/addActor', (req, res, next) => {
  let p1 = Movie.find()
  let p2 = Celebrity.find() 
  Promise.all([p1, p2])
  .then(values => {
    let movieData = values[0]
    console.log(movieData)
    let celebrityData = values[1]
    console.log(celebrityData)
    res.render("celebrities/addActor", {movieData, celebrityData})
  })
});

/* POST create documents in movieCelebrity Database */
  router.post("/addActor", (req, res, next) => {
    console.log("Post");
  // Define sources for new object
  const _movie = req.body._movie
  const _celebrity = req.body._celebrity
  // Create new object based on form input and model
  const addLink = new celebrityMovie ({_movie, _celebrity})
  addLink.save() 
  .then(newLink => {
    console.log("added link")
    res.redirect("/celebrities/addActor")})
  .catch( err =>
    console.log("error add", err)
    //res.redirect("/celebrities/new")
    ) 
  })
  
/* POST edit existing celebrities */
// Matches all routes with the pattern POST /celebrities/..
// Therefore put it in the end so all hardcoded paths are matched before
router.post("/:id", (req, res, next) => {
  console.log("I ve been here!!!");
  
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
  res.redirect("/celebrities/index")
  //console.log(updateCeleb)
))
})


module.exports = router;
