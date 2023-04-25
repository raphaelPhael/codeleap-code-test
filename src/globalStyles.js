import { styled, TextField as TextFieldMui } from "@mui/material";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const TextFieldInput = styled(TextFieldMui)(({ height = 32 }) => ({
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

export const ActionButtons = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-end",
}));

export const ResponsiveContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px",
  outline: "none",
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  width: "120px",
  height: "32px",
  bgcolor: "#fff",
  border: "1px solid #999999",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "700",
  color: "#000",
  marginRight: "16px",
  "&:hover": {
    bgcolor: "#ececec",
  },
  [theme.breakpoints.down(450)]: {
    width: "100%",
    margin: 0,
  },
}));

export const LoadingButtonMui = styled(LoadingButton)(
  ({ theme, disabled, severity }) => ({
    width: "120px",
    height: "32px",
    background:
      severity === "error"
        ? disabled
          ? "#e0e0e0"
          : "#ff5151"
        : disabled
          ? "#e0e0e0"
          : "#47b960",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    "&:hover": {
      background: severity === "error" ? "#fd3737" : "#1fb640",
    },
    [theme.breakpoints.down(450)]: {
      width: "100%",
      margin: 0,
      marginTop: "16px",
    },
  })
);

export const deleteModalSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: 660,
  minHeight: 146,
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #999999",
  outline: "none",
};

export const editModalSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: 660,
  minHeight: 334,
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #999999",
  outline: "none",
};