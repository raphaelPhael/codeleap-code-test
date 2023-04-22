import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import {
  getPostsSuccess,
  deletePostSuccess,
  updatePostSuccess,
} from "../../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../Post/post-component";

import { styled, TextField as TextFieldMui } from "@mui/material";

const TextFieldInput = styled(TextFieldMui)(({ height = 32 }) => ({
  padding: "0",
  "& .MuiInputBase-root": {
    height: height,
    border: "1px solid #777777",
    borderRadius: "8px",
    outline: "none",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
}));

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 660,
  height: 146,
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #999999",
  outline: "none",
};

const editModalStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 660,
  minHeight: 334,
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #999999",
  outline: "none",
};

const Posts = () => {
  const initialUrl = "https://dev.codeleap.co.uk/careers/";
  const [url, setUrl] = useState(initialUrl);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postId, setPostId] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: null,
  });
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  async function getPosts() {
    let res = await fetch(url, {
      method: "GET",
    });

    if (res.ok) {
      let data = await res.json();
      const sortedByDateTime = data.results.sort(
        (a, b) => new Date(b.created_datetime) - new Date(a.created_datetime)
      );
      dispatch(getPostsSuccess(sortedByDateTime));
      setUrl(data.next);
    } else {
      setToast({
        open: true,
        message: "Oops! Something went wrong.",
        severity: "error",
      });
    }
  }

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
    setIsDeleteLoading(true);
  }

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
    setIsEditLoading(true);
  }

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => handleCloseToast()}
      >
        <Alert variant="filled" severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
      <InfiniteScroll
        style={{ padding: "0 24px" }}
        dataLength={posts.length}
        next={getPosts}
        hasMore={true}
      >
        {posts.map((post) => {
          return (
            <Post
              key={uuidv4()}
              post={post}
              setPostId={(postId) => setPostId(postId)}
              setIsEditModalOpen={(bool) => setIsEditModalOpen(bool)}
              setIsDeleteModalOpen={(bool) => setIsDeleteModalOpen(bool)}
            />
          );
        })}
      </InfiniteScroll>
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style} elevation={0}>
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h4"
              sx={{ fontSize: "22px", fontWeight: "700" }}
            >
              Are you sure you want to delete this item?
            </Typography>
          </Box>
          <Box sx={{ alignSelf: "end" }}>
            <Button
              sx={{
                width: "120px",
                height: "32px",
                bgcolor: "#fff",
                border: "1px solid #999999",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "700",
                color: "#000",
                marginRight: "12px",
                "&:hover": {
                  bgcolor: "#ececec",
                },
              }}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isDeleteLoading}
              sx={{
                width: "120px",
                height: "32px",
                bgcolor: "#ff5151",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#fd3939",
                },
              }}
              onClick={() => handleDeletePost()}
            >
              Delete
            </LoadingButton>
          </Box>
        </Paper>
      </Modal>
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={editModalStyle} elevation={0}>
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
          <Box sx={{ alignSelf: "end" }}>
            <Button
              sx={{
                width: "120px",
                height: "32px",
                bgcolor: "#fff",
                border: "1px solid #999999",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "700",
                color: "#000",
                marginRight: "12px",
                "&:hover": {
                  bgcolor: "#ececec",
                },
              }}
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isEditLoading}
              disabled={!title.length && !content.length ? true : false}
              sx={{
                width: "120px",
                height: "32px",
                bgcolor: "#47b960",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#1fb640",
                },
              }}
              onClick={() => handleEditPost()}
            >
              Save
            </LoadingButton>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default Posts;
