import React from "react";
import "./MovieApp.css";

const MovieCard = ({ movie, onClick }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img className="movie-img" src={imageUrl} alt={movie.title} />
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>({movie.release_date?.slice(0, 4)})</p>
        <p>⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
