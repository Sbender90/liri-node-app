
// var spotifyKey = new spotify(keys.spotify);
// var twitterKey = new twitter(keys.twitter);
// var omdbKey = new omdbKey(keys.omdb);

require("dotenv").config();
var keys = require('./keys.js');
var request = require("request");
var Twitter = require('twitter');
var spotify = require('spotify');
var inquirer = require('inquirer');


// var nodeArgs = process.argv;

// var movieName = "";

// for (var i = 2; i < nodeArgs.length; i++) {

//   if (i > 2 && i < nodeArgs.length) {

//     movieName = movieName + "+" + nodeArgs[i];

//   }

//   else {

//     movieName += nodeArgs[i];

//   }
// }

// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// console.log(queryUrl);

// request(queryUrl, function(error, response, body) {

// if (!error && response.statusCode === 200) {
//   var parsedJSON = JSON.parse(body);

//         console.log("Year the movie came out: " + parsedJSON.Year);
//         console.log("IMDB Rating of the movie: " + parsedJSON.imdbRating);
//         console.log("Rotten Tomatoes Rating of the movie: " + parsedJSON.Ratings[1]["Value"]);
//         console.log("Country where the movei was produced: " + parsedJSON.Country);
//         console.log("Language of the movie: " + parsedJSON.Language);
//         console.log("Plot of the movie: " + parsedJSON.Plot);
//         console.log("Actors in the movie: " + parsedJSON.Actors);
//   }
// });

var startApp = function(){
  inquirer.prompt([
    {
      type: "list",
      name: "userInput",
      message: "Pick a Command:",
      choices: ["my-tweets", "sotify-this-song", "movie-this", "do-what-it-says"] 
    }

  ]).then(function(liriInput){
    switch (liriInput.userInput){
    case "my-tweets":
      getTweets(startApp);
      break;
    case "spotify-this-song":
      getSpotify(startApp);
      break;
    case "movie-this":
      getMovie(startApp);
      break;
    case "do-what-it-says":
      getRandom(getSpotify, startApp);
      break;
    default :
      console.log("error");
      break;
    }
  });
}
startApp();
//--------------------------------------------------
var queryHandle;
var callback;
var client = new Twitter(keys.twitter);
var getTweets = function(callbackFunction) {
  callback = callbackFunction;
  inquirer.prompt([
    {
      type: "input",
      name: "twitterHandle",
      message: "give me a Twitter Handle"
    }
  ]).then(function(userInput){
    if(userInput.twitterHandle === ""){
      queryHandle = "@officialjaden";
    }else {
      queryHandle = userInput.twitterHandle;
    }
    var params = {screen_name: queryHandle};
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
      if (!error) {
      var count = 0;
      console.log("\n--------------------------");
      tweets.forEach(function(tweet){
        if(tweets > 20){
          count++;
          if(count <= 20){
            displayInfo(tweet);
          }
        }
        displayInfo(tweet);
      });
      console.log("--------------------------");
    } else{
      return console.log("twitter error:", error);
    }
    callback();
    }) 
  })

  function displayInfo(tweet){
    console.log("\n--------------------------");
    console.log("");
    console.log("\ntweet: ", tweet.text);
    console.log("Created at: ", tweet.created_at);
    console.log("\n");
  }


};
//----------------------------
var queryMovie;
var callback;

var getMovie = function(callbackFunction){
  callback = callbackFunction;
  inquirer.prompt([
    {
      type: "input",
      name: "movieTitle",
      message: "Type a movie title"
    }
  ]).then(function(userInput){
    if(userInput.movieTitle === ""){
      queryMovie = "Free Willy";
    
    }else {
      queryMovie = userInput.movieTitle;
    }
		request("http://www.omdbapi.com/?t=" + queryMovie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
		  if (!error && response.statusCode === 200) {
		   	var parsedJSON = JSON.parse(body);
				console.log("\n###############################################");
			  console.log("\n");
			  console.log("Title: " + parsedJSON.Title);
			  console.log("Release date: " + parsedJSON.Released);
				console.log("IMDB rating: " + parsedJSON.imdbRating);
				console.log("Rotten Tomatoes rating: " + parsedJSON.Ratings[1]["Value"]);
				console.log("Country origin: " + parsedJSON.Country);
				console.log("Language: " + parsedJSON.Language);
				console.log("Plot: " + parsedJSON.Plot);
				console.log("Actors: " + parsedJSON.Actors);
				console.log("\n###############################################");
				console.log("\n");
		  }else {
		  	return console.log(error, " ", response.statusCode)
		  }
		  callback();
		})

  })
};



//----------------------------------------------------
// var params = {q: 'Sbender90',
//                   count: 20,
//                   resilt_type: "recent",
//                   lang: "en"
//               };
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     if (tweets.length > 0){
//       tweets.forEach (function(tweet) {
//         console.log("\n------------------------")
//         console.log(tweet.text)
//         console.log(tweet.created_at)
//         console.log("------------------------")
//       })
//     }
    
//     else if (tweets.length === 0) console.log("No Tweets for this handle");
//   }
// });
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