


const displayInfo = (movieInfo) => {
  const Monlist = document.getElementById("Monlist");

  const moviePoster = createMoviePoster(movieInfo.poster_path);

  
  currentMovieTitle = movieInfo.title;

  moviePosterDiv.appendChild(moviePoster);

  Monlist.appendChild(movieInfo);

};

const createMovieTitle = (title) => {
  const titleHeader = document.createElement("h1");
  titleHeader.setAttribute("id", "movieTitle");
  titleHeader.innerHTML = title;

  return titleHeader;
};

const readInputField = () => {
    const test = document.getElementById("inputField").value;
    console.log(test)
    return test
}