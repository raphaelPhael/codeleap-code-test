import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Grid, styled, TextField as TextFieldMui } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const TextFieldInput = styled(TextFieldMui)(({ height = 32 }) => ({
  width: "100%",
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

const SignUpPage = ({ userName, setUserName, handleClick }) => {
  const signUpModal = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    minHeight: "205px",
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid #cccccc",
    outline: "none",
  };

  return (
    <Container
      maxWidth="false"
      sx={{
        maxWidth: "548px",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={signUpModal}>
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h4"
              sx={{ fontSize: "22px", fontWeight: "700" }}
            >
              Welcome to CodeLeap network!
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
              <Typography sx={{ fontWeight: "400" }}>
                Please enter your username
              </Typography>
              <TextFieldInput
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your username"
              />
            </Box>
          </Box>
          <Grid container direction="row" justifyContent="flex-end">
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
                "&:hover": {
                  bgcolor: "#5e83eb",
                },
              }}
              onClick={() => handleClick()}
            >
              Enter
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
