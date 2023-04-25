import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import getTimeSincePost from "../../utils/getTime";
import { postWrapperSx, postHeaderSx, postTitleSx } from "./postStyles";

const Post = ({
  post,
  setPostId,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
}) => {
  const username = useSelector((state) => state.user.username);

  const openDeleteModal = (id) => {
    setPostId(id);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (id) => {
    setPostId(id);
    setIsEditModalOpen(true, post);
  };

  return (
    <Box sx={postWrapperSx}>
      <Box>
        <Box sx={postHeaderSx}>
          <Box sx={{ width: "75%" }}>
            <Typography variant="h4" sx={postTitleSx}>
              {post.title}
            </Typography>
          </Box>
          {post.username === username && (
            <Box sx={{ display: "flex" }}>
              <DeleteForeverIcon
                sx={{
                  marginRight: "24px",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => openDeleteModal(post.id)}
              />
              <EditIcon
                sx={{ color: "#fff", cursor: "pointer" }}
                onClick={() => openEditModal(post.id)}
              />
            </Box>
          )}
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "24px",
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                color: "#777777",
                fontWeight: "700",
              }}
            >
              @{post.username}
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                color: "#777777",
                fontWeight: "400",
              }}
            >
              {getTimeSincePost(post.created_datetime)}
            </Typography>
          </Box>
          <Box sx={{ padding: "0 24px 24px 24px", wordBreak: "break-all" }}>
            <Typography
              paragraph={true}
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#000000",
              }}
            >
              {post.content}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
