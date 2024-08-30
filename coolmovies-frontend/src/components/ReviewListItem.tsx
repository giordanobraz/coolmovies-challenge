import {
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import EditImage from "../../public/edit.svg";
import { ReviewDetails } from "../redux/types";
import { useState } from "react";
import FormReview from "./FormReview";
import { css } from "@emotion/react";

interface ReviewListItemProps {
  review: ReviewDetails;
  userReviewerId: string;
  movieId: string;
}

const ReviewListItem = ({
  review,
  movieId,
  userReviewerId,
}: ReviewListItemProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Card>
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography component={"h3"} css={styles.title}>
              {review.title}
            </Typography>
            <Image
              src={EditImage}
              onClick={onOpenModal}
              alt="Edit Review"
              width={25}
              height={25}
              style={{ cursor: "pointer" }}
            />
          </Box>

          <Rating readOnly value={review.rating} size="small" />

          <Typography>{review.body}</Typography>
        </CardContent>

        <CardActions></CardActions>
      </Card>

      <Dialog
        open={openModal}
        onClose={onCloseModal}
        fullWidth
        fullScreen={fullScreen}
      >
        <DialogTitle>{"Edit Review"}</DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
          <FormReview
            existingReview={review}
            isEditing={true}
            onClose={onCloseModal}
            movieId={movieId}
            userReviewerId={userReviewerId}
          />
        </DialogContent>
      </Dialog>
    </>
  );

  function onOpenModal() {
    setOpenModal(true);
  }

  function onCloseModal() {
    setOpenModal(false);
  }
};

const styles = {
  title: css({
    fontSize: "1.2rem",
    fontWeight: "bold",
  }),
};

export default ReviewListItem;
