import { Box, Button, Rating, TextField } from "@mui/material";
import { useState } from "react";
import { ReviewDetails } from "../redux/types";
import { useDispatch } from "react-redux";
import { reviewsActions, useAppSelector } from "../redux";

interface FormReviewProps {
  existingReview?: ReviewDetails;
  isEditing?: boolean;
  onClose?: () => void;
  movieId: string;
  userReviewerId: string;
}

const FormReview = ({
  existingReview,
  isEditing,
  onClose,
  movieId,
  userReviewerId,
}: FormReviewProps) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState<number>(existingReview?.rating || 0);
  const [title, setTitle] = useState<string>(existingReview?.title || "");
  const [body, setBody] = useState<string>(existingReview?.body || "");

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box display={"flex"} gap={2} flexDirection={"column"} marginBottom={2}>
          <TextField
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />

          <TextField
            label="Review"
            fullWidth
            multiline
            rows={5}
            margin="dense"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required
          />

          <Rating
            onChange={(value, newValue) => setRating(newValue || 0)}
            value={rating}
          />

          <Box display={"flex"} gap={2}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button onClick={clearFormFields}>Cancel</Button>
          </Box>
        </Box>
      </form>
    </>
  );

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!rating) {
      alert("Please, rate!");
      return;
    }

    if (isEditing) {
      onEditReview();
    } else {
      try {
        dispatch(
          reviewsActions.createReview({
            body,
            rating,
            title,
            movieId,
            userReviewerId,
          })
        );

        clearFormFields();
      } catch (error) {
        console.error(error);
      }
    }
  }

  function onEditReview() {
    if (!existingReview) {
      return;
    }

    try {
      dispatch(
        reviewsActions.updateReview({
          id: existingReview.id,
          body,
          movieId,
          rating,
          title,
          nodeId: existingReview.nodeId,
        })
      );

      clearFormFields();
    } catch (error) {
      console.error(error);
    }
  }

  function clearFormFields() {
    setRating(0);
    setTitle("");
    setBody("");
    onClose?.();
  }
};

export default FormReview;
