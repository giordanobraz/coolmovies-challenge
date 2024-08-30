import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieDetails } from "../../types";

interface InitialState {
  hasError: boolean;
  movies?: MovieDetails[];
}

const initialState: InitialState = {
  hasError: false,
  movies: [],
};

export const slice = createSlice({
  initialState,
  name: "movies",
  reducers: {
    fetch: () => {},
    loaded: (state, action: PayloadAction<{ data: MovieDetails[] }>) => {
      state.movies = action.payload.data;
      state.hasError = false;
    },
    loadError: (state) => {
      state.hasError = true;
    },
    clearData: (state) => {
      state.hasError = false;
      state.movies = [];
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
