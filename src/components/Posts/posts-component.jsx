import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from 'uuid';
import { getPostsSuccess, deletePostSuccess, updatePostSuccess } from "../../actions/actions";
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import getTimeSincePost from "../../utils/getTime";

import {styled, TextField as TextFieldMui} from '@mui/material'
const TextFieldInput = styled(TextFieldMui)(() => ({
  border: "1px solid #777777", 
  borderRadius: "8px", 
  width: "612px", 
  height: "32px"
}));

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 660,
  height: 146,
  padding: '24px',
  borderRadius: "16px",
  border: '1px solid #999999',
  outline: 'none',
};

const editModalStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 660,
  minHeight: 334,
  padding: '24px',
  borderRadius: "16px",
  border: '1px solid #999999',
  outline: 'none',
}

const Posts = () => {
  const initialUrl = 'https://dev.codeleap.co.uk/careers/';
  const [url, setUrl] = useState(initialUrl);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postId, setPostId] = useState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: null,
  });
  const username = useSelector((state) => state.user.username);
  const posts = useSelector((state) => state.posts.posts)
  const dispatch = useDispatch();

  async function getPosts() {
    let res = await fetch(url, {
      method: 'GET'
    });

    if (res.ok) {
      let data = await res.json();
      const sortedByDateTime = data.results.sort((a, b) => new Date(b.created_datetime) - new Date(a.created_datetime));
      dispatch(getPostsSuccess(sortedByDateTime));
      setUrl(data.next);
    } else {
      setToast({
        open: true,
        message: 'Oops! Something went wrong.',
        severity: 'error',
      }); 
    }
  }

  const openDeleteModal = (id) => {
    setPostId(id);
    setIsDeleteModalOpen(true);
  }

  const openEditModal = (id) => {
    setPostId(id);
    setIsEditModalOpen(true);
  }

  async function handleDeletePost() {
    const res = await fetch(`${initialUrl}/${postId}/`, {
      method: 'DELETE'
    });

    if(res.ok) {
      dispatch(deletePostSuccess(postId)); 
      setIsDeleteModalOpen(false);
      setToast({
        open: true,
        message: 'Post Deleted Successfully!',
        severity: 'success',
      });
    } else {
      setIsDeleteModalOpen(false);
      setToast({
        open: true,
        message: 'Oops! Something went wrong.',
        severity: 'error',
      });
    }
  }

  async function handleEditPost() {
    const bodyData = {
      title,
      content
    }

    const res = await fetch(`${initialUrl}/${postId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    })

    if (res.ok) {
      const data = await res.json();
      dispatch(updatePostSuccess(data));
      setTitle('');
      setContent('');
      setIsEditModalOpen(false);
      setToast({
        open: true,
        message: 'Post Updated Successfully!',
        severity: 'success',
      });
      console.log(bodyData)
    } else {
      setToast({
        open: true,
        message: 'Oops! Something went wrong.',
        severity: 'error',
      });
    }
  }

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Snackbar open={toast.open} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => handleCloseToast()}>
        <Alert variant="filled" severity={toast.severity}>{toast.message}</Alert>      
      </Snackbar>
      <InfiniteScroll
        dataLength={posts.length}
        next={getPosts}
        hasMore={true}
        loader={
            <CircularProgress />
          // <Grid container justifyContent='center'>
          // </Grid>
        }
      >
        {posts.map(x => {
          return (
            <Box
            key={uuidv4()}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "752px", 
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
              marginTop: "24px"
            }}
            >
              <Box>
                <Box sx={{
                  bgcolor: "#7695EC", 
                  height: "70px", 
                  borderTopLeftRadius: "16px", 
                  borderTopRightRadius: "16px", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 24px"
                  }}>
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
                        color: "#fff" 
                      }}>
                        {x.title}
                    </Typography>
                  </Box>
                  {x.username === username &&
                    <Box>
                      <DeleteForeverIcon sx={{ marginRight: "24px", color: "#fff", cursor: "pointer" }} onClick={() => openDeleteModal(x.id)}/>
                      <EditIcon sx={{ color: "#fff", cursor: "pointer" }} onClick={() => openEditModal(x.id)}/>
                    </Box>
                  }
                </Box>
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", padding: "24px" }}>
                    <Typography sx={{ fontSize: "18px", color: "#777777", fontWeight: "700" }}>@{x.username}</Typography>
                    <Typography sx={{ fontSize: "18px", color: "#777777", fontWeight: "400" }}>{getTimeSincePost(x.created_datetime)}</Typography>
                  </Box>
                  <Box sx={{ padding: "0 24px 24px 24px", wordBreak: "break-all" }}>
                    <Typography paragraph={true} sx={{ fontSize: "18px", fontWeight: "700", color: "#000000" }}>{x.content}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>    
          )
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
            <Typography id="modal-modal-title" variant="h4" sx={{ fontSize: "22px", fontWeight: "700" }}>
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
              '&:hover': {
                bgcolor: "#ececec"
              }
            }} 
            onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
            sx={{ 
              width: "120px", 
              height: "32px", 
              bgcolor: "#ff5151", 
              borderRadius: "8px",
              fontSize: "16px", 
              fontWeight: "bold",
              color: "#fff",
              '&:hover': {
                bgcolor: "#fd3939"
              }
            }}
            onClick={() => handleDeletePost()}
            >
              Delete
            </Button>
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
            <Typography id="modal-modal-title" variant="h4" sx={{ fontSize: "22px", fontWeight: "700" }}>
              Edit item
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", paddingBottom: "24px" }}>
            <Box sx={{ paddingTop: "24px" }}>
              <Typography>Title</Typography>
              <TextFieldInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                // disableUnderline={true} 
                // variant="outlined"
                // size="small"
                placeholder="Hello World" 
                
                // sx={{ 
                //   border: "1px solid #777777", 
                //   borderRadius: "8px", 
                //   width: "710px", 
                //   height: "32px" 
                //   }} 
                />
              {/* <InputLabel sx={{ color: "#000", marginTop: "24px" }}>Content</InputLabel> */}
            </Box>
            <Box sx={{ paddingTop: "24px" }}>
              <Typography>Content</Typography>
              <TextField 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                // id="outlined-basic" 
                // disableUnderline={true} 
                variant="outlined"
                multiline
                rows={2}
                placeholder="Content Here"
                sx={{
                  width: "612px",
                  // height: "74px",
                  // border: "1px solid #777777", 
                  borderRadius: "8px", 
                }}
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
              '&:hover': {
                bgcolor: "#ececec"
              }
            }} 
            onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
            sx={{ 
              width: "120px", 
              height: "32px", 
              bgcolor: "#47b960", 
              borderRadius: "8px",
              fontSize: "16px", 
              fontWeight: "bold",
              color: "#fff",
              '&:hover': {
                bgcolor: "#30b84d"
              }
            }}
            onClick={() => handleEditPost()}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  )
};

export default Posts;