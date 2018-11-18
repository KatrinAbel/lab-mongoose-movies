const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movies');

const dbName = 'starter-code';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrityArr = [
  {
    name: "Dobby",
    occupation: "House elf",
    catchphrase: "Dobby is a free elf!",
  },
  {
    name: "Hermine Granger",
    occupation: "Student",
    catchphrase: "When in doubt, go to the library.",
  },
  {
    name: "Albus Dumbledore",
    occupation: "Headmaster",
    catchphrase: "It does not do well to dwell on dreams and forget to live." ,
  },
]

const moviesArr = [
  {
    title: "Sorcerer Stone",
    genre: "Fiction",
    plot: "Hogwarts, Fluffy, Stone",
  },
  {
    title: "Chamber of Secrets",
    genre: "Thriller",
    plot: "Elf, Bathroom, Snake",
  },
  {
    title: "Goblet of Fire",
    genre: "Action",
    plot: "Quidditch, Tournament, Cedric",
  }
]

// Save in the database all the celebrities 
// Celebrity.create(celebrityArr, (err) => {
//   if (err) { throw(err) }
//   console.log(`Created ${celebrityArr.length} movie`)
//   mongoose.connection.close()
// });

//Save in the database all the celebrities 
// Movie.create(moviesArr, (err) => {
//   if (err) { throw(err) }
//   console.log(`Created ${moviesArr.length} movie`)
//   mongoose.connection.close()
// });