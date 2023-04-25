import { useDispatch } from "react-redux";
import { updatePostSuccess } from "../../actions/actions";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  TextFieldInput,
  ActionButtons,
  ResponsiveContainer,
  CancelButton,
  LoadingButtonMui,
  editModalSx,
} from "../../globalStyles";

const EditModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  title,
  setTitle,
  content,
  setContent,
  isEditLoading,
  setIsEditLoading,
  postId,
  setToast,
}) => {
  const initialUrl = process.env.REACT_APP_INITIAL_URL;
  const dispatch = useDispatch();
  async function handleEditPost() {
    setIsEditLoading(true);
    const bodyData = {};
    if (title.length) bodyData.title = title;
    if (content.length) bodyData.content = content;

    const res = await fetch(`${initialUrl}/${postId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(updatePostSuccess(data));
      setTitle("");
      setContent("");
      setIsEditModalOpen(false);
      setToast({
        open: true,
        message: "Post Updated Successfully!",
        severity: "success",
      });
      console.log(bodyData);
    } else {
      setToast({
        open: true,
        message: "Oops! Something went wrong.",
        severity: "error",
      });
    }
    setIsEditLoading(false);
  }

  return (
    <Modal
      open={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ResponsiveContainer>
        <Paper sx={editModalSx} elevation={0}>
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h4"
              sx={{ fontSize: "22px", fontWeight: "700" }}
            >
              Edit item
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "24px",
            }}
          >
            <Box sx={{ paddingTop: "24px" }}>
              <Typography>Title</Typography>
              <TextFieldInput
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Hello World"
              />
            </Box>
            <Box sx={{ paddingTop: "24px" }}>
              <Typography>Content</Typography>
              <TextFieldInput
                fullWidth
                height={74}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                variant="outlined"
                multiline
                rows={2}
                placeholder="Content Here"
                sx={{ borderRadius: "8px" }}
              />
            </Box>
          </Box>
          <ActionButtons>
            <CancelButton onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </CancelButton>

            <LoadingButtonMui
              severity="success"
              loading={isEditLoading}
              disabled={!title.length && !content.length ? true : false}
              onClick={() => handleEditPost()}
            >
              Save
            </LoadingButtonMui>
          </ActionButtons>
        </Paper>
      </ResponsiveContainer>
    </Modal>
  );
};

export default EditModal;
