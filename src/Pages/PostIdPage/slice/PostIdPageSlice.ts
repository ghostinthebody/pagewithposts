import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import PostService from '../../../API/PostService'; // Предполагаю, что сервис у вас уже есть
import { PostIdPageState, Post, Comment } from '../../../types';

// Thunk для получения поста по ID
export const fetchPostById = createAsyncThunk<Post, number, { rejectValue: string }>(
  'post/fetchPostById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await PostService.getById(id);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

// Thunk для получения комментариев по ID поста
export const fetchCommentsByPostId = createAsyncThunk<Comment[], number, { rejectValue: string }>(
  'post/fetchCommentsByPostId',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await PostService.getCommentsByPostId(id);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const initialState: PostIdPageState = {
    post: null,
    comments: [],
    isPostLoading: false,
    postError: '',
    isCommentsLoading: false,
    commentsError: '',
};

const PostIdPageSlice = createSlice({
  name: 'post',
  initialState,
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
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isPostLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isPostLoading = false;
        state.postError = action.payload;
      })
      // Обработка fetchCommentsByPostId
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.isCommentsLoading = true;
        state.commentsError = '';
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.isCommentsLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isCommentsLoading = false;
        state.commentsError = action.payload;
      });
  },
});

export const { reducer: PostIdPageReducer, actions: PostIdPageActions } = PostIdPageSlice;