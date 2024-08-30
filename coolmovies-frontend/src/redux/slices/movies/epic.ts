import { Epic, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { actions, SliceAction } from "./slice";
import { RootState } from "../../store";
import { EpicDependencies, MovieDetails } from "../../types";
import { gql } from "@apollo/client";

interface GetAllMoviesQueryResponse {
  allMovies: {
    nodes: MovieDetails[];
  };
}

export const moviesEpic: Epic = (
  action$: Observable<SliceAction["fetch"]>,
  state: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async () => {
      try {
        const result = await client.query<GetAllMoviesQueryResponse>({
          query,
        });
        return actions.loaded({ data: result.data.allMovies.nodes });
      } catch (error) {
        return actions.loadError();
      }
    })
  );

const query = gql`
  query GetAllMoviesQuery {
    allMovies {
      nodes {
        title
        releaseDate
        id
        imgUrl
      }
    }
  }
`;
