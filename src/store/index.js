import { configureStore } from '@reduxjs/toolkit';
import fetchingReducer from './PostIdPageSlice';
import { LoginReducer } from '../Pages/Login/slice/LoginSlice'
import { PostReducer } from '../Pages/Posts/slice/PostSlice';
// import postIdPageReducer from './postIdPageReducer';
// import loginReducer from './loginReducer';
// import postsReducer from './postsReducer';

export default configureStore({
  reducer: {
    fetching: fetchingReducer,
    login: LoginReducer,
    post: PostReducer,
    // postsIdPage: postIdPageReducer,
    // login: loginReducer,
    // posts: postsReducer,
  },
});