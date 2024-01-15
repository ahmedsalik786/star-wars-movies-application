import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./favSlice";
import moviesSlice from "./moviesSlice";

const store = configureStore({
  reducer: {
    favoriteMovies: favSlice,
    movies: moviesSlice,
  },
});
export default store;
