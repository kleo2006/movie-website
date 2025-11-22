import React, { useState, useEffect } from "react";
import {
  fetchMovies,
  searchMovies,
  fetchGenres,
  fetchMoviesByGenre,
  fetchSimilarMovies,
} from "../api/movieApi";
import Navbar from "./Navbar";
import MovieGrid from "./MovieGrid";
import MovieModal from "./MovieModal";
import "./MovieApp.css";

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState("home");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  // Load movies or genres depending on page
  useEffect(() => {
    if (page === "home") {
      loadMovies("popular");
    } else if (page === "categories") {
      loadGenres();
    }
  }, [page]);

  // Fetch movies by type
  const loadMovies = async (type) => {
    const data = await fetchMovies(type);
    setMovies(data);
    setSelectedGenre(null);
    setPage("movies");
  };

  // Fetch genres
  const loadGenres = async () => {
    const data = await fetchGenres();
    setGenres(data);
  };

  // Fetch movies by genre
  const handleGenreClick = async (genre) => {
    const data = await fetchMoviesByGenre(genre.id);
    setMovies(data);
    setSelectedGenre(genre.name);
    setPage("movies");
  };

  // Search
  const handleSearch = async (query) => {
    const results = await searchMovies(query);
    setMovies(results);
    setSelectedGenre(null);
    setPage("movies");
  };

  // Handle movie card click (open modal + fetch similar)
  const handleCardClick = async (movie) => {
    setSelectedMovie(movie);
    const similar = await fetchSimilarMovies(movie.id);
    setSimilarMovies(similar);
  };

  // Close modal
  const closeModal = () => setSelectedMovie(null);

  return (
    <div>
      {/* Navbar */}
      <Navbar
        onSearch={handleSearch}
        onTabClick={(tab) => loadMovies(tab)}
        goHome={() => setPage("home")}
        goCategories={() => setPage("categories")}
      />

      {/* Categories Page */}
      {page === "categories" && (
        <div className="categories-page">
          <h2>Categories</h2>
          <div className="genre-list">
            {genres.map((genre) => (
              <button
                key={genre.id}
                className={`genre-btn ${
                  selectedGenre === genre.name ? "active-genre" : ""
                }`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Movies Page */}
      {page === "movies" && (
        <div className="app-container">
          <div className="main-content">
            {selectedGenre && (
              <h2 style={{ color: "#ff3d00", marginBottom: "20px" }}>
                {selectedGenre} Movies
              </h2>
            )}
            <MovieGrid movies={movies} onCardClick={handleCardClick} />
          </div>
        </div>
      )}

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      {/* Similar Movies Section */}
      {similarMovies.length > 0 && !selectedMovie && (
        <div className="similar-section">
          <h2>Recommended for You</h2>
          <div className="similar-grid">
            {similarMovies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => handleCardClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h4>{movie.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieApp;
