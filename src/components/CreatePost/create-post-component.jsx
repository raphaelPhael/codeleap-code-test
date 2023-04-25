import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPostSuccess } from "../../actions/actions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { Grid, styled, TextField as TextFieldMui } from "@mui/material";
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

const createPostWrapperSx = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginTop: "24px",
  border: "1px solid #999999",
  borderRadius: "16px",
};

const loadingButtonSx = {
  width: "120px",
  height: "32px",
  bgcolor: "#7695EC",
  "&:hover": {
    bgcolor: "#5f86f3",
  },
};

const CreatePost = () => {
  const username = useSelector((state) => state.user.username);
  const url = process.env.REACT_APP_INITIAL_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: null,
  });
  const dispatch = useDispatch();

  async function createPostFn(e) {
    e.preventDefault();
    setIsLoading(true);
    const bodyData = {
      username,
      title,
      content,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(createPostSuccess(data));
      setTitle("");
      setContent("");
      setToast({
        open: true,
        message: "Post Shared Successfully!",
        severity: "success",
      });
    } else {
      setToast({
        open: true,
        message: "Oops! Something went wrong.",
        severity: "error",
      });
    }
    setIsLoading(false);
  }

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ padding: "0 24px" }}>
      <Box sx={createPostWrapperSx}>
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
        <Box sx={{ display: "flex", flexDirection: "column", padding: "24px" }}>
          <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
            What's on your mind?
          </Typography>
          <form onSubmit={createPostFn}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "24px",
              }}
            >
              <Box>
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
            <Grid container direction="row" justifyContent="flex-end" mt="24px">
              <LoadingButton
                type="submit"
                loading={isLoading}
                disabled={title.length && content.length ? false : true}
                variant="contained"
                sx={loadingButtonSx}
                // onClick={() => createPostFn()}
              >
                Create
              </LoadingButton>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePost;
