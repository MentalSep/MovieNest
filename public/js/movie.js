const TMDB_API_URL = "https://api.themoviedb.org/3/movie";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzFmYjNjNDM1YmI5OWUyYTM4NTJjNTMwY2EwZDEzMyIsIm5iZiI6MTcxMDA5NzgzNi4zMTksInN1YiI6IjY1ZWUwNWFjZTI2N2RlMDE0OTRjNjU0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.STrjSeqN8TcNxUzJe5ACHYiCMw16sK5oNgll-ZJnMBc";

const id = window.location.pathname.split("/").pop();

const fetchMovie = async (id) => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    return {};
  }
};

const fetchSimilarMovies = async (id) => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/${id}/recommendations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return {};
  }
};

const loadMovie = async () => {
  const movie = await fetchMovie(id);
  const similar = await fetchSimilarMovies(id);

  const movieDetails = document.querySelector(".movie-detail");
  const similarMovies = document.querySelector(".similar-movies");
  const markupDetails = `
    <div class="row g-4">
        <div class="col-md-4">
            <img
            src="${IMAGE_BASE_URL}${movie.poster_path}"
            alt="${movie.title}"
            class="img-fluid rounded shadow"
            />
        </div>
        <div class="col-md-8">
            <h1 class="mb-3">${movie.title}</h1>
            <p class="text-secondary">Release Date: <span>${movie.release_date}</span></p>
            <p class="text-secondary">Rating: <span>${movie.vote_average}/10</span></p>
            <p class="mt-4">
            <strong>Overview:</strong>
            ${movie.overview}
            </p>
            <div class="mt-4">
            <a href="#" class="btn btn-primary me-2"
                ><i class="bi bi-play-circle"></i> Watch Now</a>
            <a href="#" class="btn btn-outline-secondary"
                ><i class="bi bi-heart"></i> Add to Favorites</a>
            </div>
        </div>
    </div>

    `;
  // only do 4 similar movies
  const markupSimilar = `
    <h2 class="mb-4">Similar Movies</h2>
    <div class="row">
        ${similar.results
          .slice(0, 4)
          .map(
            (movie) => `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <a href="${movie.id}" class="movie-card">
            <img
              src="${IMAGE_BASE_URL}${movie.poster_path}"
              alt="Similar Movie 1"
              class="img-fluid"
            />
            </a>
            <div class="card-title-overlay">
                <span>${movie.title}</span>
            </div>
        </div>`
          )
          .join("")}
    </div>
    `;

  movieDetails.innerHTML = markupDetails;
  similarMovies.innerHTML = markupSimilar;
};

document.addEventListener("DOMContentLoaded", loadMovie);
