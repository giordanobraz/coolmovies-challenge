export { actions as userActions } from "./slice";
export { default as userReducer } from "./slice";
import { combineEpics } from "redux-observable";
import { userEpic } from "./epic";

export const userEpics = combineEpics(userEpic);
