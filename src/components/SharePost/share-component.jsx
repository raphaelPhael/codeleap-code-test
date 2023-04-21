import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPostSuccess } from "../../actions/actions";
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
// import Input from '@mui/material/Input';
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import {styled, TextField as TextFieldMui} from '@mui/material'
const TextFieldInput = styled(TextFieldMui)(({ height = 32 }) => ({
  // border: "1px solid #777777", 
  // borderRadius: "8px", 
  width: "710px", 
  // height: "32px",
  padding: "0",
  "& .MuiInputBase-root": {
    height: height,
    border: "1px solid #777777", 
    borderRadius: "8px", 
    outline: "none",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none"
    }
  }
}));

const Share = () => {
  const username = useSelector((state) => state.user.username);
  const url = 'https://dev.codeleap.co.uk/careers/'
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: null,
  });
  const dispatch = useDispatch();

  async function createPost() {
    const bodyData = {
      username,
      title,
      content
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    })

    if (res.ok) {
      const data = await res.json();
      dispatch(createPostSuccess(data));
      setTitle('');
      setContent('');
      setToast({
        open: true,
        message: 'Post Shared Successfully!',
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

  return (
    <Box sx=
      {{ 
        display: "flex",
        flexDirection: "column",
        width: "752px", 
        marginTop: "24px",
        border: "1px solid #999999", 
        borderRadius: "16px"
      }}
    >
      <Snackbar open={toast.open} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => handleCloseToast()}>
        <Alert variant="filled" severity={toast.severity}>{toast.message}</Alert>      
      </Snackbar>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "24px 0 24px 24px"}}>
        <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>What's on your mind?</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", paddingTop: "24px" }}>
          <Box>
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
            <TextFieldInput
              height={74}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              // id="outlined-basic" 
              // disableUnderline={true} 
              variant="outlined"
              multiline
              rows={2}
              placeholder="Content Here"
              sx={{
                width: "704px",
                // height: "74px",
                // border: "1px solid #777777", 
                borderRadius: "8px", 
              }}
            />
          </Box>
        </Box>
        <Box sx={{ alignSelf: "self-end", padding: "24px 24px 0 24px" }}>
          <Button 
            disabled={title.length && content.length ? false : true}
            variant="contained" 
            sx={{ 
                width: "120px",
                height: "32px",
                bgcolor: "#7695EC",
                '&:hover': {
                  bgcolor: "#5f86f3",
                }
              }}
              onClick={() => createPost()}
            >
           Create 
          </Button>
        </Box>
      </Box>
    </Box>    
  )
}

export default Share;