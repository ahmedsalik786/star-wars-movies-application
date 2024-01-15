import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMovies(state, action) {
      state.data = action.payload;
    },
  },
});

export const { fetchMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
