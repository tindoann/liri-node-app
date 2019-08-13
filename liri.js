require('dotenv').config();

// required packages
const keys = require('./keys.js');
const axios = require('axios');
const nodeArgs = process.argv;
const Spotify = require('node-spotify-api');

// Take in the command line arguments
let options = process.argv[2];
let nodeArgs = process.argv;
let query = '';

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s

for (var i = 2; i < nodeArgs.length; i++) {
  if (i > 2 && i < nodeArgs.length) {
    query = query + "+" + nodeArgs[i];
  } else {
    query += nodeArgs[i];

  }
}

function liri(opitons, query) {

  switch (options) {
    case "concert-this":
      concerThis(query);
      break;

    case "spotify-this-song":
      spotifyThis(query);
      break;

    case "movie-this":
      movieThis(query);
      break;

    case "do-what-it-says":
      doWhatInfo();
      break;
  }
}