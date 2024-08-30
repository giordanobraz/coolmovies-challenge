import { css } from "@emotion/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  reviewsActions,
  useAppDispatch,
  useAppSelector,
  userActions,
} from "../../redux";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import FormReview from "../../components/FormReview";
import Link from "next/link";
import ReviewListItem from "../../components/ReviewListItem";
import { format } from "date-fns";

const ReviewsPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { reviews, movie, hasError } = useAppSelector((state) => state.reviews);
  const { user } = useAppSelector((state) => state.users);

  const {
    query: { movieId },
  } = useRouter();

  useEffect(() => {
    if (movieId) {
      dispatch(reviewsActions.fetch({ movieId: movieId as string }));
    }
  }, [dispatch, movieId]);

  if (hasError || !movie) {
    return (
      <Typography>{"An error occurred while retrieving data :("}</Typography>
    );
  }

  if (!reviews) {
    return <Typography>{"Theres no reviews to show."}</Typography>;
  }

  return (
    <div css={styles.container}>
      <Typography variant={"h1"} css={styles.heading}>
        {"Movie Reviews"}
      </Typography>

      <Grid container spacing={2} justifyContent={"center"} marginTop={2}>
        <Grid item xs={12} md={4}>
          <Box marginBottom={2} marginRight={2} textAlign={"center"}>
            <Image
              alt={movie.title}
              src={movie.imgUrl}
              height={300}
              width={200}
            />

            <Typography css={styles.movieTitle}>{movie.title}</Typography>
            <Typography>{format(movie.releaseDate, "dd/MM/yyyy")}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <FormReview movieId={movieId as string} userReviewerId={user.id} />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {reviews.map((review) => (
          <Grid key={review.id} item xs={12} paddingBottom={2}>
            <ReviewListItem
              review={review}
              movieId={movieId as string}
              userReviewerId={user.id}
            />
          </Grid>
        ))}
      </Grid>

      <Link href={"/"}>{"Back to Main Page"}</Link>
    </div>
  );
};

const styles = {
  container: css({
    alignSelf: "center",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    maxWidth: "1200px",
  }),
  heading: css({ marginTop: 16, fontSize: "2.75rem", textAlign: "center" }),
  movieTitle: css({
    fontWeight: "bold",
  }),
};

export default ReviewsPage;
