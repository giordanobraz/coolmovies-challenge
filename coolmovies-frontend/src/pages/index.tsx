import { css } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import {
  useAppDispatch,
  useAppSelector,
  moviesActions,
  userActions,
} from "../redux";
import { useEffect } from "react";
import Movie from "../components/Movie";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { movies, hasError } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(userActions.fetch());
    dispatch(moviesActions.fetch());
  }, [dispatch]);

  return (
    <div css={styles.body}>
      <Typography variant={"h1"} css={styles.heading}>
        {"EcoPortal Coolmovies Test"}
      </Typography>

      <div css={styles.content}>
        {hasError && (
          <Box alignItems={"center"}>
            <Typography>
              {"An error occurred while retrieving data :("}
            </Typography>
          </Box>
        )}

        {movies ? (
          <Movie movies={movies} />
        ) : (
          <Box alignItems={"center"}>
            <Typography>{"No content available."}</Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

const styles = {
  body: css({
    alignSelf: "stretch",
    padding: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  heading: css({ marginTop: 16, fontSize: "2.75rem", textAlign: "center" }),
  content: css({ marginTop: 32 }),
};

export default Home;
