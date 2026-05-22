import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch popular, top-rated, upcoming movies
export const fetchMovies = async (type = "popular") => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US`);
    return res.data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Search movies by query
export const searchMovies = async (query) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
    );
    return res.data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Fetch all genres
export const fetchGenres = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    return res.data.genres;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Fetch movies by genre ID
export const fetchMoviesByGenre = async (genreId) => {
  try {
    const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    return res.data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};
export const fetchSimilarMovies = async (movieId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    return res.data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};
