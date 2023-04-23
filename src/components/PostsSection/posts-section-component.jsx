import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
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
import { TextFieldInput } from "../../globalStyles";
import {
  ActionButtons,
  ResponsiveContainer,
  CancelEditButton,
  LoadingButtonMui,
  deleteModalSx,
  editModalSx,
} from "./postsStyles";

const PostsSection = () => {
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
    setIsDeleteLoading(false);
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
    setIsEditLoading(false);
  }

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleEditModal = (isModalActive, post) => {
    setTitle(post?.title || "");
    setContent(post?.content || "");
    setIsEditModalOpen(isModalActive);
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
              setIsEditModalOpen={(bool, currentPost) =>
                handleEditModal(bool, currentPost)
              }
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
            <ActionButtons>
              <CancelEditButton onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </CancelEditButton>
              <LoadingButtonMui
                severity="error"
                loading={isDeleteLoading}
                //sx={confirmDeleteButtonSx}
                onClick={() => handleDeletePost()}
              >
                Delete
              </LoadingButtonMui>
            </ActionButtons>
          </Paper>
        </ResponsiveContainer>
      </Modal>
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
              <CancelEditButton onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </CancelEditButton>

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
    </>
  );
};

export default PostsSection;
