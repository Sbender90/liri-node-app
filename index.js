
// var spotifyKey = new spotify(keys.spotify);
// var twitterKey = new twitter(keys.twitter);
// var omdbKey = new omdbKey(keys.omdb);

require("dotenv").config();
var keys = require('./keys.js');
var request = require("request");
var Twitter = require('twitter');
var spotify = require('spotify');
var inquirer = require('inquirer');

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

// var queryTrack;
// var callback;
// var spotify = new Spotify(keys.spotify);
// console.log("spotify:", spotify);
// var getSpotify = function(callbackFunction, queryStr){
// 	callback = callbackFunction;

// 	if(queryStr === undefined){
// 		inquirer.prompt([
// 		  {
// 				type: "input",
// 		    name: "trackName",
// 		    message: "Type in a song name"
// 		  }
// 		]).then(function(userInput){spotifySearch(userInput, callbackFunction)})		
// 	} else {
// 		spotifySearch({trackName: queryStr}, callbackFunction);
// 	}
// };	

// function spotifySearch(userInput, callbackFunction){
// 		queryTrack = userInput.trackName;
// 		if(userInput.trackName === "") {
// 			spotify.search({ type: "track", query: "Ace of Base" }, function(err, data){
// 			  if (err){
// 			    return console.log("Error occurred: " + err);
// 			  }
// 				displayInfo(data, callbackFunction);
// 			})
// 		}else {
// 			queryTrack = userInput.trackName;
// 			spotify.search({ type: "track", query: queryTrack }, function(err, data){
// 			  if (err){
// 			    return console.log("Error occurred: " + err);
// 			  }
// 				displayInfo(data, callbackFunction)
// 			})
// 		}
// 	}

// function displayInfo(data, callbackFunction){
// 	console.log("\n--------------------");
// 	console.log("\nArtist: ", data.tracks.items[0].artists[0].name);
// 	console.log("Song: ", data.tracks.items[0].name);
// 	console.log("A preview link: ", data.tracks.items[0].external_urls.spotify);
// 	console.log("Album: ", data.tracks.items[0].album.name);
// 	console.log("\n");
// 	console.log("--------------------");
// 	callbackFunction();
// };

