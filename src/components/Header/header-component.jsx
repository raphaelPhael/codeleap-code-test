import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux";
import { logOutUserSuccess } from "../../actions/actions";

const Header = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("userName");
    dispatch(logOutUserSuccess());
  }

  return (
    <Box sx={{ 
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 27px",
        bgcolor: "#7695EC", 
        width: "100%", 
        height: "80px",
      }}>
      <Box>
        <Typography 
          variant="h4" 
          sx={{ fontSize: "22px", fontWeight: "700", color: "#fff" }}>
            CodeLeap Network
        </Typography>
      </Box>
      <Box>
        <LogoutIcon 
          sx={{ 
            fontSize: "30px", 
            color: "#fff", 
            cursor: "pointer", 
            // padding: "5px", 
            // borderRadius: "100%",
              bgcolor: "#6486e3", 
            "&:hover": {
              bgcolor: "#6486e3", 
            }
          }}
          onClick={() => handleLogOut()}
        >add_circle</LogoutIcon>
      </Box>
    </Box>
  )
};

export default Header;
