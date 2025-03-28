// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const PostsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    filter: { sort: '', query: '' },
    modal: false,
    totalPages: 0,
    limit: 10,
    page: 1,
    isPostsLoading: false,
    postError: null,
  },
  reducers: {
    setPosts: (state, action) => { state.posts = action.payload },
    addPosts: (state, action) => { state.posts = [...state.posts, ...action.payload] },
    setFilter: (state, action) => { state.filter = action.payload },
    setModal: (state, action) => { state.modal = action.payload },
    setTotalPages: (state, action) => { state.totalPages = action.payload },
    setLimit: (state, action) => { state.limit = action.payload },
    setPage: (state, action) => { state.page = action.payload },
    setLoading: (state, action) => { state.isPostsLoading = action.payload },
    setError: (state, action) => { state.postError = action.payload },
  },
});


export const { reducer: PostReducer, actions: PostActions } = PostsSlice;