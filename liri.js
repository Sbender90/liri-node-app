
// var spotifyKey = new spotify(keys.spotify);
// var twitterKey = new twitter(keys.twitter);
// var omdbKey = new omdbKey(keys.omdb);

require("dotenv").config();
var config = require('./keys.js');
var request = require("request");
var Twitter = require('twitter');
var spotify = require('spotify');


var nodeArgs = process.argv;

var movieName = "";

for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

request(queryUrl, function(error, response, body) {

if (!error && response.statusCode === 200) {
    

        console.log("Year the movie came out: " + JSON.parse(body).Year);
        console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
        // console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).rottenTomatoesRating);
        console.log("Country where the movei was produced: " + JSON.parse(body).Country);
        console.log("Language of the movie: " + JSON.parse(body).Language);
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log("Actors in the movie: " + JSON.parse(body).Actors);
  }
});
//--------------------------------------------------
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var params = {q: 'Sbender90',
                  count: 20,
                  resilt_type: "recent",
                  lang: "en"
              };
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(JSON.stringify(tweets.text, null, 2));
  }
});
// 

// songSearch = function(){}
// var spotify = new Spotify({
//   id: process.env.SPOTIFY_ID,
//   secret: process.env.SPOTIFY_SECRET
// });

 
// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
 
//     // Do something with 'data' 
// });