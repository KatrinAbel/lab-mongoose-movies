const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const celebrityMovieSchema = new Schema({
_movie: Schema.Types.ObjectId,
_celebrity: Schema.Types.ObjectId,
});

const celebrityMovie = mongoose.model("celebrityMovie", celebrityMovieSchema);

module.exports = celebrityMovie;