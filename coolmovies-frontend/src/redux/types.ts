import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export type CreateStoreOptions = {
  epicDependencies?: EpicDependencies;
};

export type EpicDependencies = {
  client: ApolloClient<NormalizedCacheObject>;
};

export type MovieDetails = {
  id: string;
  title: string;
  imgUrl: string;
  releaseDate: string;
};

export type ReviewDetails = {
  id: string;
  body: string;
  title: string;
  rating: number;
  nodeId: number;
};

export type CurrentUser = {
  id: string;
  name: string;
};

export type CreateReviewInputType = {
  id?: string;
  body: string;
  rating: number;
  title: string;
  movieId: string;
  userReviewerId?: string;
};
