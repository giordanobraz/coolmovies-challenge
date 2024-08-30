import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateReviewInputType,
  MovieDetails,
  ReviewDetails,
} from "../../types";

type Movie = Omit<MovieDetails, "id">;

interface InitialState {
  reviews?: ReviewDetails[];
  movie?: Movie;
  hasError: boolean;
}

const initialState: InitialState = {
  hasError: false,
  reviews: [],
};

export const slice = createSlice({
  initialState,
  name: "reviews",
  reducers: {
    fetch: (state, action: PayloadAction<{ movieId: string }>) => {},
    clearData: (state) => {
      state.reviews = undefined;
      state.hasError = false;
    },
    loaded: (
      state,
      action: PayloadAction<{ reviews: ReviewDetails[]; movie: Movie }>
    ) => {
      state.reviews = action.payload.reviews;
      state.movie = action.payload.movie;
      state.hasError = false;
    },
    loadError: (state) => {
      state.hasError = true;
    },
    createReview: (state, action: PayloadAction<CreateReviewInputType>) => {},
    updateReview: (
      state,
      action: PayloadAction<CreateReviewInputType & { nodeId: number }>
    ) => {},
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
