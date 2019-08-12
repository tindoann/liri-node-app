function movieThis(movie) {

  const axios = require("axios");

  if (movie === false) {
    movie = 'Mr. Nobody';
    console.log(`If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/`);
    console.log(`It's on Netflix!`);
  }

  let movieName = "";
  const nodeArgs = process.argv;


  for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i]; // movieName = movieName + nodeArgs[i];
    }


    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
          console.log(`
    Title: ${response.data.Title}
    Year: ${response.data.Year}
    RIMDB Rating: ${response.data.Rated}
    Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
    Country: ${response.data.Country}
    Laguage: ${response.data.Language}
    Plot: ${response.data.Plot}
    Actor: ${response.data.Actors}
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
  }
};

movieThis();