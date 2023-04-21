import { createSlice } from '@reduxjs/toolkit'
import { deletePostSuccess, getPostsSuccess, updatePostSuccess, createPostSuccess } from '../../actions/actions';

const initialState = {
  posts: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsSuccess, (state, action) => {
        state.posts = [...state.posts, ...action.payload];
      })
      .addCase(createPostSuccess, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(updatePostSuccess, (state, action) => {
        const postIdx = state.posts.findIndex(post => post.id === action.payload.id);
        const newPostsArr = state.posts;
        newPostsArr[postIdx] = action.payload;
        state.posts = [...newPostsArr];
      })
      .addCase(deletePostSuccess, (state, action) => {
        state.posts = state.posts.filter(x => x.id !== action.payload);
      })
  }
})

export default postsSlice.reducer;