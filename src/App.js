import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { logUserSuccess } from "./actions/actions";
import MainPage from "./pages/main-page/main-page-component";

import {styled, TextField as TextFieldMui} from '@mui/material'
const TextFieldInput = styled(TextFieldMui)(({ height = 32 }) => ({
  width: "452px", 
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

function App() {
  const myUserName = useSelector((state) => state.user.username)
  const [loggedUserName, setLoggedUserName] = useState(localStorage.getItem("userName"));
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const signUpModal = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 500,
    height: 205,
    backgroundColor: "#fff",
    padding: '24px',
    borderRadius: "16px",
    border: '1px solid #cccccc',
    outline: 'none',
  }

  useEffect(() => {
    if (!myUserName.length && loggedUserName !== null) {
      dispatch(logUserSuccess(loggedUserName));
    } 
  }, []);

  const handleClick = () => {
    localStorage.setItem("userName", userName);
    dispatch(logUserSuccess(userName));
    setLoggedUserName(userName);
    setUserName("");
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center", height: "auto" }}>
      {loggedUserName !== null && loggedUserName === myUserName ?
        <Box sx={{ width: "800px", bgcolor: "#fff" }}>
          <MainPage />
        </Box>
        :
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <Box sx={signUpModal}>
            <Box>
              <Typography id="modal-modal-title" variant="h4" sx={{ fontSize: "22px", fontWeight: "700" }}>
                Welcome to CodeLeap network!
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", paddingBottom: "24px" }}>
              <Box sx={{ paddingTop: "24px" }}>
                <Typography sx={{ fontWeight: "400" }}>Please enter your username</Typography>
                <TextFieldInput
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your username" 
                />
              </Box>
            </Box>
            <Box sx={{ alignSelf: "end" }}>
              <Button 
                disabled={userName.length ? false : true}
                sx={{ 
                  width: "120px", 
                  height: "32px", 
                  bgcolor: "#7695ec", 
                  borderRadius: "8px",
                  fontSize: "16px", 
                  fontWeight: "bold",
                  color: "#fff",
                  '&:hover': {
                    bgcolor: "#5e83eb"
                  }
                }}
                onClick={() => handleClick()}
              >
                Enter
              </Button>
            </Box>
          </Box>
        </Box>
      }
    </Container>
  );
}

export default App;
