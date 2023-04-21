import { createAction } from '@reduxjs/toolkit'
import actionTypes from './actionTypes'

export const getPostsSuccess = createAction(actionTypes.GET_POSTS_SUCCESS);
export const getPostsFail = createAction(actionTypes.GET_POSTS_FAIL);
export const createPostSuccess = createAction(actionTypes.CREATE_POST_SUCCESS);
export const updatePostSuccess = createAction(actionTypes.UPDATE_POST_SUCCESS);
export const deletePostSuccess = createAction(actionTypes.DELETE_POST_SUCCESS);
export const logUserSuccess = createAction(actionTypes.LOG_USER_SUCCESS);
export const logOutUserSuccess = createAction(actionTypes.LOG_OUT_USER_SUCCESS);

// export const getPosts = (page) => ({
//   type: actionTypes.GET_POSTS,
//   payload: page
// })