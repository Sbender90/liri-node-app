

require("dotenv").config();
/* <script src="keys.js"></script> */
var request = require("request");
var fs = require("fs");

var action = process.argv[2];
var value = process.argv[3];
var movieName = "";



// var spotifyKey = new spotify(keys.spotify);
// var twitterKey = new twitter(keys.twitter);
// var omdbKey = new omdbKey(keys.omdb);

switch (action) {
    case "movie-this":
      movieData();
      break;
    }
function movieData() {
    var nodeArgs = process.argv;
   
    for (var i = 2; i < nodeArgs.length; i++) {

      if (i > 2 && i < nodeArgs.length) {
    
        movieName = movieName + "+" + nodeArgs[i];
    
      }
    
      else {
    
        movieName += nodeArgs[i];
      }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
    
      // If the request is successful
      if (!error && response.statusCode === 200) {
    
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Title of the movie: " + JSON.parse(body).Title);
        console.log("Year the movie came out: " + JSON.parse(body).Year);
        console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
        // console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).rottenTomatoesRating);
        console.log("Country where the movei was produced: " + JSON.parse(body).Country);
        console.log("Language of the movie: " + JSON.parse(body).Language);
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log("Actors in the movie: " + JSON.parse(body).Actors);

      }
    });
  }



