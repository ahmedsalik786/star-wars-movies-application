// favSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {
    add(state, action) {
      console.log("movie added to favorites", action.payload.title);
      console.log("action", action.payload);
      return [...state, action.payload];
    },
    remove(state, action) {
      return state.filter(
        (item) => item.episode_id !== action.payload.episode_id
      );
    },
  },
});

export const { add, remove } = favSlice.actions;
export default favSlice.reducer;
