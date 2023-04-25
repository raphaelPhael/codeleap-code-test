import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getPostsSuccess } from "../../actions/actions";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../Post/post-component";
import DeleteModal from "../DeleteModal/delete-modal-component";
import EditModal from "../EditModal/edit-modal-component";

const PostsSection = () => {
  const initialUrl = process.env.REACT_APP_INITIAL_URL;
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
        loader={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <CircularProgress />
          </Box>
        }
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
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={(bool) => setIsDeleteModalOpen(bool)}
        isDeleteLoading={isDeleteLoading}
        setIsDeleteLoading={(bool) => setIsDeleteLoading(bool)}
        postId={postId}
        setToast={setToast}
      />
      <EditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={(bool) => setIsEditModalOpen(bool)}
        title={title}
        setTitle={(str) => setTitle(str)}
        content={content}
        setContent={(str) => setContent(str)}
        isEditLoading={isEditLoading}
        setIsEditLoading={(bool) => setIsEditLoading(bool)}
        postId={postId}
        setToast={setToast}
      />
    </>
  );
};

export default PostsSection;
