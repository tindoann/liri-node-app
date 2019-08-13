require('dotenv').config();

// Required packages
const keys = require('./keys.js');
const axios = require('axios');
const fs = require("fs");
const moment = require('moment');
const Spotify = require('node-spotify-api');

// Take in the command line arguments
let options = process.argv[2];
let nodeArgs = process.argv;
let query = '';

// Loop through all the words in the node argument and do a little for-loop magic to handle the inclusion of "+"s
for (let i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    query = query + "+" + nodeArgs[i];
  } else {
    query += nodeArgs[i];
  }
}

// Switch statement to determine the flow of user's storyline
switch (options) {
  case 'concert-this':
    concertThis(query);
    break;

  case 'spotify-this-song':
    spotifyThis(query);
    break;

  case 'movie-this':
    movieThis(query);
    break;

  case 'do-what-it-says':
    doThis();
    break;
}

// BANDSINTOWN
function concertThis(query) {
  let queryUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"

  axios.get(queryUrl).then(
      function (response) {
        let results = response.data;
        for (let j = 0; j < 5; j++) {
          console.log(`
            Venue: ${results[j].venue.name}
            Venue location: ${results[j].venue.city}
            Event date: ${moment(results[j].datetime).format('MM/DD/YYYY')}
  `)
        }
      })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    })
};



// SPOTIFY 
function spotifyThis(query) {
  let spotify = new Spotify(keys.spotify);

  if (!query) {
    query == 'The Sign Ace of Base';
  }

  spotify.search({
      type: 'track',
      query: query,
      limit: 5
    })
    .then(function (response) {
      let results = response.tracks.items;
      for (let k = 0; k < 5; k++) {
        console.log(`
          Artist(s): ${results[k].album.artists[0].name}
          Preview: ${results[k].preview_url}
          Album: ${results[k].album.name}
      `)
      }
    })
    .catch(function (err) {
      console.log(err)
    })
};

// OMDB 
function movieThis(query) {
  if (!query) {
    query = 'Mr. Nobody';
    console.log(`If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/`);
    console.log(`It's on Netflix!`);
  }

  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
      function (response) {
        let results = response.data;
        console.log(`
          Title: ${results.Title}
          Year: ${results.Year}
          IMDB Rating: ${results.Rated}
          Rotten Tomatoes Rating: ${results.Ratings[1].Value}
          Country: ${results.Country}
          Laguage: ${results.Language}
          Plot: ${results.Plot}
          Actor: ${results.Actors}
  `);
      })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    })
};

// FILE.SYSTEM READ
function doThis() {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    dataArr = data.split(',');
    for (var i = 0; i < dataArr.length; i++) {
      console.log(dataArr[i]);
    }
  })
}
