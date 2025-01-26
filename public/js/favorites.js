const token = document.cookie.split("=")[1];
if (!token) {
  alert("You need to Log in to access this page!");
  window.location.href = "/login";
}

const fetchFavorites = async () => {
  try {
    const response = await axios.get("/api/favorites", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.favoriteMovies || [];
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

const fetchMovieDetails = async (movieId) => {
  const TMDB_API_URL = "https://api.themoviedb.org/3/movie";
  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzFmYjNjNDM1YmI5OWUyYTM4NTJjNTMwY2EwZDEzMyIsIm5iZiI6MTcxMDA5NzgzNi4zMTksInN1YiI6IjY1ZWUwNWFjZTI2N2RlMDE0OTRjNjU0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.STrjSeqN8TcNxUzJe5ACHYiCMw16sK5oNgll-ZJnMBc";

  try {
    const response = await axios.get(`${TMDB_API_URL}/${movieId}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

const removeFromFavorites = async (movieId) => {
  try {
    await axios.post(
      "/unfavorite",
      { movieId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    loadFavorites();
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

const loadFavorites = async () => {
  const favoriteMovies = await fetchFavorites();
  //   console.log("favoriteMovies", favoriteMovies);

  const favoriteMoviesData = await Promise.all(
    favoriteMovies.map(async (movieId) => {
      const movieData = await fetchMovieDetails(movieId);
      return movieData;
    })
  );
  //   console.log("favoriteMoviesData", favoriteMoviesData);

  const favoritesList = document.getElementById("favorites-list");

  if (favoriteMoviesData.length === 0) {
    favoritesList.innerHTML = `<p>No favorite movies found!</p>`;
  } else {
    favoritesList.innerHTML = favoriteMoviesData
      .map(
        (movie) => `
          <div class="col-sm-6 col-md-4 col-lg-3">
            <a href="/movie/${movie.id}" class="movie-card">
              <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                alt="${movie.title}"
                class="img-fluid"
              />
            </a>
            <div class="card-title-overlay">
              <span>${movie.title}</span>
              <button class="btn btn-outline-danger" onclick="removeFromFavorites(${movie.id})">Remove from Favorites</button>
            </div>
          </div>
        `
      )
      .join("");
  }
};

document.addEventListener("DOMContentLoaded", loadFavorites);
