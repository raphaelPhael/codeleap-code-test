import { styled, TextField as TextFieldMui } from "@mui/material";

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