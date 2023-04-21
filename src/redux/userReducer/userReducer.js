import { createSlice } from '@reduxjs/toolkit'
import { createPostSuccess, logOutUserSuccess, logUserSuccess, updatePostSuccess } from '../../actions/actions';

const initialState = {
  username: "",
  userPosts: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logUserSuccess, (state, action) => {
        state.username = action.payload;
      })
      .addCase(logOutUserSuccess, (state, action) => {
        state.username = ""
      })
      .addCase(createPostSuccess, (state, action) => {
        state.userPosts = [...state.userPosts, action.payload];
      })
      .addCase(updatePostSuccess, (state, action) => {
        const postIdx = state.userPosts.findIndex(post => post.id === action.payload.id);
        const newUserPostsArr = state.userPosts;
        newUserPostsArr[postIdx] = action.payload;
        state.userPosts = [...newUserPostsArr];
      })
  }
})

export default userSlice.reducer;