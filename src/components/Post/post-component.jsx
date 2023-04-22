import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import getTimeSincePost from "../../utils/getTime";

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
    setIsEditModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "334px",
        marginBottom: "24px",
        borderLeft: "1px solid #999999",
        borderRight: "1px solid #999999",
        borderBottom: "1px solid #999999",
        borderTop: "1px solid #999999",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        borderBottomLeftRadius: "16px",
        borderBottomRightRadius: "16px",
        marginTop: "24px",
      }}
    >
      <Box>
        <Box
          sx={{
            bgcolor: "#7695EC",
            height: "70px",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <Box sx={{ width: "75%" }}>
            <Typography
              variant="h4"
              sx={{
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontSize: "22px",
                fontWeight: "700",
                color: "#fff",
              }}
            >
              {post.title}
            </Typography>
          </Box>
          {post.username === username && (
            <Box>
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
