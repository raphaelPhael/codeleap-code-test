import { useDispatch } from "react-redux";
import { deletePostSuccess } from "../../actions/actions";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  ResponsiveContainer,
  deleteModalSx,
  ActionButtons,
  CancelButton,
  LoadingButtonMui,
} from "../../globalStyles";

const DeleteModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  isDeleteLoading,
  setIsDeleteLoading,
  postId,
  setToast,
}) => {
  const initialUrl = process.env.REACT_APP_INITIAL_URL;
  const dispatch = useDispatch();
  async function handleDeletePost() {
    setIsDeleteLoading(true);
    const res = await fetch(`${initialUrl}/${postId}/`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deletePostSuccess(postId));
      setIsDeleteModalOpen(false);
      setToast({
        open: true,
        message: "Post Deleted Successfully!",
        severity: "success",
      });
    } else {
      setIsDeleteModalOpen(false);
      setToast({
        open: true,
        message: "Oops! Something went wrong.",
        severity: "error",
      });
    }
    setIsDeleteLoading(false);
  }

  return (
    <Modal
      open={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ResponsiveContainer>
        <Paper sx={deleteModalSx} elevation={0}>
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h4"
              sx={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "32px",
              }}
            >
              Are you sure you want to delete this item?
            </Typography>
          </Box>
          <form onSubmit={handleDeletePost}></form>
          <ActionButtons>
            <CancelButton onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </CancelButton>
            <LoadingButtonMui
              severity="error"
              loading={isDeleteLoading}
              onClick={() => handleDeletePost()}
            >
              Delete
            </LoadingButtonMui>
          </ActionButtons>
        </Paper>
      </ResponsiveContainer>
    </Modal>
  );
};

export default DeleteModal;
