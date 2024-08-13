# Movie App

This is a React Native application that allows users to browse and search for movies, view details, and manage their favorite movies. The app integrates with The Movie Database (TMDb) API to provide movie data, including trending movies, genres, and more.

## Features

- **Trending Movies:** Browse the latest trending movies.
- **Search:** Search for movies by title.
- **Movie Details:** View detailed information about a movie, including cast, genre, and production companies.
- **Favorites:** Add and remove movies from your favorite list.

## Tech Stack

- **React Native:** Framework for building mobile apps.
- **Typescript:** For type-safe development.
- **React Navigation:** Navigation library for managing app screens.
- **Apisauce:** Simplified API calls with Axios.
- **Zustand:** State management library.
- **Lodash:** Utility functions for common programming tasks.
- **TMDb API:** Fetches movie data.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/inoxxe/movie-app.git
   cd movie-app
   ```

2. **Install dependencies:**

   ```bash
   # using npm
   npm install

   #or using Yarn
   yarn install
   ```

3. **Run the app:**

   for iOS

   ```bash
   npx pod-install
   # using npm
   npm run ios

   # OR using Yarn
   yarn ios
   ```

   for android

   ```bash
   # using npm
   npm run android

   # OR using Yarn
   yarn android
   ```

## Acknowledgements

[TMDb API](https://developer.themoviedb.org/reference/intro/getting-started) for providing movie data.

[React Native](https://reactnative.dev/) for the mobile app framework.

[Apisauce](https://github.com/infinitered/apisauce) for simplified API calls.
