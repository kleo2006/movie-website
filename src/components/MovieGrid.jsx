
import React from "react";
import MovieCard from "./MovieCard";
import "./MovieApp.css";

const MovieGrid = ({ movies, onCardClick }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default MovieGrid;
