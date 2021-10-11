const BASE_URL = "https://api.themoviedb.org/3";
const KEY = "bee2b3b8d9976a2be3aae8b77feecf89";

function fetchTrending() {
  return fetch(`${BASE_URL}/trending/all/day?api_key=${KEY}`).then(
    (response) => {
      return response.json();
    }
  );
}

function fetchSearchMovies(movieName) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&query=${movieName}&page=1&include_adult=false`
  ).then((response) => {
    return response.json();
  });
}

function fetchMovieById(movieId) {
  return fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${KEY}&language=en-US`
  ).then((response) => {
    return response.json();
  });
}

function fetchMovieCredits(movieId) {
  return fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}&language=en-US`
  ).then((response) => {
    return response.json();
  });
}

function fetchMovieReviews(movieId) {
  return fetch(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`
  ).then((response) => {
    return response.json();
  });
}

const Api = {
  fetchTrending,
  fetchSearchMovies,
  fetchMovieById,
  fetchMovieCredits,
  fetchMovieReviews,
};
export default Api;
