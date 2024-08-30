import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { CreateStoreOptions } from "./types";
import {
  reviewsEpics,
  reviewsReducer,
  userEpics,
  userReducer,
  moviesEpics,
  moviesReducer,
} from "./slices";

const rootEpic = combineEpics(moviesEpics, reviewsEpics, userEpics);

export const createStore = ({ epicDependencies }: CreateStoreOptions) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: epicDependencies,
  });

  const createdStore = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(epicMiddleware),
    reducer: {
      movies: moviesReducer,
      reviews: reviewsReducer,
      users: userReducer,
    },
  });

  epicMiddleware.run(rootEpic);

  return createdStore;
};

export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
