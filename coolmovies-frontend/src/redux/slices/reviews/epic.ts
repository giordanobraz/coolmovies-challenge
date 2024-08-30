import { Epic, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { actions, SliceAction } from "./slice";
import { RootState } from "../../store";
import { EpicDependencies, ReviewDetails } from "../../types";
import { gql } from "@apollo/client";

interface GetReviewsQueryResponse {
  movieById: {
    title: string;
    imgUrl: string;
    releaseDate: string;
    movieReviewsByMovieId: {
      nodes: ReviewDetails[];
    };
  };
}

export const getReviewsEpic: Epic = (
  actions$: Observable<SliceAction["fetch"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  actions$.pipe(
    filter(actions.fetch.match),
    switchMap(async (action) => {
      try {
        const { movieId } = action.payload;
        const result = await client.query<GetReviewsQueryResponse>({
          query: GetReviewsQuery,
          fetchPolicy: "no-cache",
          variables: { movieId },
        });
        return actions.loaded({
          reviews: result.data.movieById.movieReviewsByMovieId.nodes,
          movie: result.data.movieById,
        });
      } catch (error) {
        actions.loadError();
      }
    })
  );

export const createReviewEpic: Epic = (
  actions$: Observable<SliceAction["createReview"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  actions$.pipe(
    filter(actions.createReview.match),
    switchMap(async (action) => {
      try {
        const { movieId, userReviewerId, title, body, rating } = action.payload;

        await client.mutate({
          mutation: CreateMovieReviewMutation,
          variables: {
            title,
            movieId,
            userReviewerId,
            body,
            rating,
          },
        });
        return actions.fetch({ movieId });
      } catch (error) {
        console.error(error);
      }
    })
  );

export const updateReviewEpic: Epic = (
  actions$: Observable<SliceAction["updateReview"]>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  actions$.pipe(
    filter(actions.updateReview.match),
    switchMap(async (action) => {
      try {
        const { movieId, title, body, rating, nodeId } = action.payload;

        await client.mutate({
          mutation: UpdateReviewMutation,
          variables: {
            nodeId,
            movieReviewPatch: {
              title,
              body,
              rating,
            },
          },
        });
        return actions.fetch({ movieId });
      } catch (error) {
        console.error(error);
      }
    })
  );

const UpdateReviewMutation = gql`
  mutation UpdateReviewMutation(
    $nodeId: ID!
    $movieReviewPatch: MovieReviewPatch!
  ) {
    updateMovieReview(
      input: { nodeId: $nodeId, movieReviewPatch: $movieReviewPatch }
    ) {
      movieReview {
        title
        body
        rating
      }
    }
  }
`;

const CreateMovieReviewMutation = gql`
  mutation CreateMovieReviewMutation(
    $title: String!
    $body: String!
    $rating: Int!
    $movieId: UUID!
    $userReviewerId: UUID!
  ) {
    createMovieReview(
      input: {
        movieReview: {
          title: $title
          body: $body
          rating: $rating
          movieId: $movieId
          userReviewerId: $userReviewerId
        }
      }
    ) {
      movieReview {
        id
        title
        body
        rating
        movieByMovieId {
          title
        }
        userByUserReviewerId {
          name
        }
      }
    }
  }
`;

const GetReviewsQuery = gql`
  query GetReviewsQuery($movieId: UUID!) {
    movieById(id: $movieId) {
      imgUrl
      releaseDate
      title
      movieReviewsByMovieId(orderBy: RATING_DESC) {
        nodes {
          body
          title
          rating
          id
          nodeId
        }
      }
    }
  }
`;
