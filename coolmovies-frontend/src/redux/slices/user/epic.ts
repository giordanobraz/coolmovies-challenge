import { Epic, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { actions, SliceAction } from "./slice";
import { RootState } from "../../store";
import { CurrentUser, EpicDependencies } from "../../types";
import { gql } from "@apollo/client";

export const userEpic: Epic = (
  action$: Observable<SliceAction["fetch"]>,
  state: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query,
        });
        return actions.loaded({ data: result.data.currentUser });
      } catch (error) {
        return actions.loadError();
      }
    })
  );

const query = gql`
  query GetCurrentUserQuery {
    currentUser {
      id
      name
    }
  }
`;
