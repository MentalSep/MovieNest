const TMDB_API_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzFmYjNjNDM1YmI5OWUyYTM4NTJjNTMwY2EwZDEzMyIsIm5iZiI6MTcxMDA5NzgzNi4zMTksInN1YiI6IjY1ZWUwNWFjZTI2N2RlMDE0OTRjNjU0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.STrjSeqN8TcNxUzJe5ACHYiCMw16sK5oNgll-ZJnMBc";

const fetchMovies = async (endpoint) => {
  try {
    const response = await axios.get(`${TMDB_API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

const createMovieCard = (movie) => {
  return `
    <div class="col-md-2">
      <a href="movie/${movie.id}" class="movie-card" data-movieId=${movie.id}>
        <img src="${IMAGE_BASE_URL}${movie.poster_path}" 
             class="card-img-top" 
             alt="${movie.title}"
             onerror="this.src='https://via.placeholder.com/300x450?text=No+Image'">
        <div class="card-title-overlay">
            <h5 class="card-title fs-6">${movie.title}</h5>
        </div>
      </a>
    </div>
  `;
};

const loadMovies = async () => {
  // Fetch movies for different sections
  const popularMovies = await fetchMovies("/movie/popular");
  const topRatedMovies = await fetchMovies("/movie/top_rated");
  const trendingMovies = await fetchMovies("/trending/movie/week");

  // Update carousel with trending movies
  const carouselInner = document.querySelector(".carousel-inner");
  carouselInner.innerHTML = trendingMovies
    .slice(0, 3)
    .map(
      (movie, index) => `
    <div class="carousel-item ${index === 0 ? "active" : ""}">
      <img src="https://image.tmdb.org/t/p/original${
        movie.backdrop_path
      }" class="d-block w-100" alt="${movie.title}">
      <div class="carousel-caption">
        <h1>${movie.title}</h1>
        <p>${movie.overview}</p>
        <a href="movie/${
          movie.id
        }" class="btn btn-primary btn-lg" data-movieId=${
        movie.id
      }>Learn More <span class="bi-arrow-right"></span></a>
      </div>
    </div>
  `
    )
    .join("");

  // Update movie sections
  document.querySelector(".popular .row").innerHTML = popularMovies
    .slice(0, 6)
    .map(createMovieCard)
    .join("");

  document.querySelector(".top-rated .row").innerHTML = topRatedMovies
    .slice(0, 6)
    .map(createMovieCard)
    .join("");

  document.querySelector(".trending .row").innerHTML = trendingMovies
    .slice(0, 6)
    .map(createMovieCard)
    .join("");
};

// Load movies when the page loads
document.addEventListener("DOMContentLoaded", loadMovies);
