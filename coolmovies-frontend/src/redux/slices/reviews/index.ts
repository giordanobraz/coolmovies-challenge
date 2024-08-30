export { actions as reviewsActions } from "./slice";
export { default as reviewsReducer } from "./slice";
import { combineEpics } from "redux-observable";
import { getReviewsEpic, createReviewEpic, updateReviewEpic } from "./epic";

export const reviewsEpics = combineEpics(
  getReviewsEpic,
  createReviewEpic,
  updateReviewEpic
);
