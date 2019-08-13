function spotifyThisSong(song){ 
const axios = require('axios');
const Spotify = require("node-spotify-api"); 
const nodeArgs = process.argv;

const spotify = new Spotify({
  
  id: 'd8c2e3ce01254ec49996d5a1b9f1d090',
  secret: 'fd1297255ea54e0599ac612ba66bf074'
});
 
if(song == false) {
  song == 'The Sign Ace of Base';
}

spotify
  .search({ type: 'track', query: song })
  , function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    let results = data.tracks.items;
    for (let k = 0; k < 5; k++) {
      console.log(`
      Artists: ${results[k].album.artists[0].name}
      Preview: ${results[k].preview_url}
      Album: ${results[k].album.name}
    `)
    }
  }
}
    spotifyThisSong();