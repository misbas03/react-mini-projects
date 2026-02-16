import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "a06da842";

  async function fetchMovies() {
    if (!searchTerm) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("Movie not found");
        setMovies([]);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <div className="search-section">
      <h1>Movie Search App</h1>
  
      <div className="search-box">
      <input
        type="text"
        placeholder="Search Movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={fetchMovies}>Search</button>
      </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
