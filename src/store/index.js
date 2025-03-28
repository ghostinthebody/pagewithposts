import { configureStore } from '@reduxjs/toolkit';
import fetchingReducer from './postSlice';
// import postIdPageReducer from './postIdPageReducer';
// import loginReducer from './loginReducer';
// import postsReducer from './postsReducer';

export default configureStore({
  reducer: {
    fetching: fetchingReducer,
    // postsIdPage: postIdPageReducer,
    // login: loginReducer,
    // posts: postsReducer,
  },
});