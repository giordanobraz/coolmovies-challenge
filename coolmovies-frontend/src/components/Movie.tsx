import { css } from "@emotion/react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MovieDetails } from "../redux/types";
import { useRouter } from "next/router";

type MovieProps = {
  movies: MovieDetails[];
};

const Movie = ({ movies }: MovieProps) => {
  const theme = useTheme();
  const { push } = useRouter();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 2, sm: 8, md: 12 }}
      justifyContent={isMobileScreen ? "center" : undefined}
    >
      {movies.map((movie: MovieDetails) => (
        <Grid key={movie.id} item>
          <Card css={styles.card} onClick={() => onMovieCardClick(movie.id)}>
            <CardMedia
              css={styles.cardMedia}
              image={movie.imgUrl}
              title={movie.title}
            />
            <CardContent>
              <Typography>{movie.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  function onMovieCardClick(movieId: string) {
    push(`/reviews/${movieId}`);
  }
};

const styles = {
  card: css({
    cursor: "pointer",
    maxWidth: 200,
    transition: "transform .3s",
    ":hover": {
      transform: "scale(1.1)",
    },
  }),
  cardMedia: css({
    height: 300,
    objectFit: "cover",
  }),
};

export default Movie;
