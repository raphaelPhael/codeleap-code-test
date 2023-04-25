import { useDispatch } from "react-redux";
import { logOutUserSuccess } from "../../actions/actions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

const headerSxWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 27px",
  bgcolor: "#7695EC",
  width: "100%",
  height: "80px",
};

const headerTitleSx = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#fff",
};

const logoutIconSx = {
  fontSize: "30px",
  color: "#fff",
  cursor: "pointer",
  padding: "5px",
  borderRadius: "100%",
  "&:hover": {
    bgcolor: "#6486e3",
  },
};

const Header = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("userName");
    dispatch(logOutUserSuccess());
  };

  return (
    <Box sx={headerSxWrapper}>
      <Box>
        <Typography variant="h4" sx={headerTitleSx}>
          CodeLeap Network
        </Typography>
      </Box>
      <Box>
        <LogoutIcon sx={logoutIconSx} onClick={() => handleLogOut()} />
      </Box>
    </Box>
  );
};

export default Header;
