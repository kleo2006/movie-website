import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieModal.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const MovieModal = ({ movie, onClose }) => {
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch trailer
        const trailerRes = await axios.get(
          `${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const officialTrailer = trailerRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(officialTrailer || null);

        // Fetch cast
        const castRes = await axios.get(
          `${BASE_URL}/movie/${movie.id}/credits?api_key=${API_KEY}&language=en-US`
        );
        setCast(castRes.data.cast.slice(0, 6));
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    fetchDetails();
  }, [movie]);

  return (
    <div className="movie-fullscreen">
      {/* Background */}
      <div
        className="movie-bg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Close Button */}
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>

      {/* Main content */}
      <div className="movie-container">
        <div className="poster-section">
          {!showTrailer ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="poster-image"
            />
          ) : trailer ? (
            <iframe
              className="trailer-video"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="no-trailer">No Trailer Available</div>
          )}
        </div>

        <div className="info-section">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-tags">
            <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
            {movie.release_date && (
              <span className="tag">{movie.release_date.slice(0, 4)}</span>
            )}
          </div>

          <p className="movie-overview">{movie.overview}</p>

          <div className="movie-actions">
            <button className="fav-btn">♡</button>
            {trailer && (
              <button
                className="watch-btn"
                onClick={() => setShowTrailer(!showTrailer)}
              >
                ▶ {showTrailer ? "CLOSE TRAILER" : "WATCH NOW"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CAST SECTION */}
      <div className="cast-section">
        <h2 className="cast-title">CAST</h2>
        <div className="cast-list">
          {cast.map((actor) => (
            <div key={actor.id} className="cast-item">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
