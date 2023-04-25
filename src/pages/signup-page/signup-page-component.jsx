import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextFieldInput } from "../../globalStyles";
import {
  signUpModalContainerSx,
  signUpModalSx,
  enterButtonSx,
} from "./signUpStyles";

const SignUpPage = ({ userName, setUserName, handleSubmit }) => {
  return (
    <Container maxWidth="false" sx={signUpModalContainerSx}>
      <Box sx={{ width: "100%" }}>
        <Box sx={signUpModalSx}>
          <Box>
            <Typography
              id="modal-modal-title"
              variant="h4"
              sx={{ fontSize: "22px", fontWeight: "700" }}
            >
              Welcome to CodeLeap network!
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
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
                  fullWidth
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your username"
                />
              </Box>
            </Box>
            <Grid container direction="row" justifyContent="flex-end">
              <Button
                disabled={userName.length ? false : true}
                sx={enterButtonSx}
                type="submit"
              >
                Enter
              </Button>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
