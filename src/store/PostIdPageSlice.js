import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../API/PostService'; // Предполагаю, что сервис у вас уже есть

// Thunk для получения поста по ID
export const fetchPostById = createAsyncThunk(
  'post/fetchPostById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await PostService.getById(id);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Thunk для получения комментариев по ID поста
export const fetchCommentsByPostId = createAsyncThunk(
  'post/fetchCommentsByPostId',
  async (id, { rejectWithValue }) => {
    try {
      const response = await PostService.getCommentsByPostId(id);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const PostIdPageSlice = createSlice({
  name: 'post',
  initialState: {
    post: {},
    comments: [],
    isPostLoading: false,
    postError: '',
    isCommentsLoading: false,
    commentsError: '',
  },
  reducers: {
    resetErrors(state) {
      state.postError = '';
      state.commentsError = '';
    },
  },
  extraReducers: (builder) => {
    // Обработка fetchPostById
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.isPostLoading = true;
        state.postError = '';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isPostLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isPostLoading = false;
        state.postError = action.payload;
      })
      // Обработка fetchCommentsByPostId
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.isCommentsLoading = true;
        state.commentsError = '';
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.isCommentsLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.isCommentsLoading = false;
        state.commentsError = action.payload;
      });
  },
});

export const madly = PostIdPageSlice.actions;
export default PostIdPageSlice.reducer;