import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsReducer/postsReducer";
import userReducer from "./userReducer/userReducer";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer
  },
});