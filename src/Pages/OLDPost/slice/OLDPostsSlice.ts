import { createSlice } from '@reduxjs/toolkit';
import { PostsState } from '../../../types';

// Начальное состояние с явной типизацией
const initialState: PostsState = {
    posts: [],
    filter: { sort: '', query: '' },
    modal: false,
    totalPages: 0,
    limit: 10,
    page: 1,
    isPostsLoading: false,
    postError: null,
};

const OLDPostsSlice = createSlice({
  name: 'posts',
  initialState,
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


export const { reducer: OLDPostsReducer, actions: OLDPostsActions } = OLDPostsSlice;