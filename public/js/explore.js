const TMDB_API_URL = "https://api.themoviedb.org/3/movie/now_playing";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzFmYjNjNDM1YmI5OWUyYTM4NTJjNTMwY2EwZDEzMyIsIm5iZiI6MTcxMDA5NzgzNi4zMTksInN1YiI6IjY1ZWUwNWFjZTI2N2RlMDE0OTRjNjU0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.STrjSeqN8TcNxUzJe5ACHYiCMw16sK5oNgll-ZJnMBc";

let currentPage = 1;

const fetchMoviesByPage = async (page) => {
  try {
    const response = await axios.get(`${TMDB_API_URL}?page=${page}`, {
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
        <div class="col-sm-6 col-md-4 col-lg-3">
          <a href="movie/${movie.id}" class="movie-card">
            <img
              src="${IMAGE_BASE_URL}${movie.poster_path}"
              alt="${movie.title}"
              class="img-fluid"
            />
            </a>
            <div class="card-title-overlay">
              <span>${movie.title}</span>
            </div>
        </div>`;
};

const loadMovies = async (page) => {
  const latestMovies = await fetchMoviesByPage(page);
  const latestMoviesContainer = document.querySelector(".movies-page .row");
  latestMoviesContainer.innerHTML += latestMovies.map(createMovieCard).join("");
};

document.addEventListener("DOMContentLoaded", () => {
  loadMovies(currentPage);

  //   const loadMoreButton = document.querySelector("#load-more-btn");
  //   loadMoreButton.addEventListener("click", () => {
  //     currentPage++;
  //     loadMovies(currentPage);
  //   });

  currentPage++;
  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadMovies(currentPage);
      currentPage++;
    }
  });
});
