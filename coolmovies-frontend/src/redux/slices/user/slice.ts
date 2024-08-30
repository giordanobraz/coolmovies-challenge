import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentUser } from "../../types";

interface InitialState {
  hasError: boolean;
  user: CurrentUser;
}

const initialState: InitialState = {
  hasError: false,
  user: {
    id: "",
    name: "",
  },
};

export const slice = createSlice({
  initialState,
  name: "user",
  reducers: {
    fetch: () => {},
    loaded: (state, action: PayloadAction<{ data: CurrentUser }>) => {
      state.user = action.payload.data;
      state.hasError = false;
    },
    loadError: (state) => {
      state.hasError = true;
    },
    clearData: (state) => {
      state.hasError = false;
      state.user = { id: "", name: "" };
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
