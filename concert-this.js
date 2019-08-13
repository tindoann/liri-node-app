function concertThis(band) {

  const axios = require('axios');
  const moment = require('moment');
  const nodeArgs = process.argv;

  let artist = "";
  for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
      artist = artist + "+" + nodeArgs[j];
    } else {
      artist += nodeArgs[i];
    }

    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(
        function (response) {
          for (let j = 0; j < 5; j++) {
          console.log(`
      Venue: ${response.data[j].venue.name}
      Venue location: ${response.data[j].venue.city}
      Event date: ${moment(response.data[j].datetime).format('MM/DD/YYYY')}
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
  }
};
concertThis();