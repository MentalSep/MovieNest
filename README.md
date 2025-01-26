# MovieNest

MovieNest is a web application that allows users to explore, view, and favorite movies. Users can sign up, log in, and manage their favorite movies. The application uses The Movie Database (TMDB) API to fetch movie data.

## Features

- User authentication (signup, login, logout)
- Explore movies
- View movie details
- Add movies to favorites
- Responsive design

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/movienest.git
   cd movienest
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the server:

   ```sh
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Signup**: Create a new account.
- **Login**: Log in to your account.
- **Explore Movies**: Browse through the list of movies.
- **View Movie Details**: Click on a movie to view its details.
- **Add to Favorites**: Add movies to your favorites list.
- **View Favorites**: View your list of favorite movies.

## API Endpoints

- `GET /`: Serve the homepage.
- `GET /movie/:id`: Serve the movie details page.
- `GET /explore`: Serve the explore movies page.
- `GET /login`: Serve the login page.
- `GET /signup`: Serve the signup page.
- `POST /signup`: Handle user signup.
- `POST /login`: Handle user login.
- `POST /api/favorites`: Add a movie to favorites.
- `GET /api/favorites`: Get the list of favorite movies.
- `POST /unfavorite`: Remove a movie from favorites.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- Axios
- Bootstrap
