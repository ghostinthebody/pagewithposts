import { createSlice } from '@reduxjs/toolkit';

const LoginSlice = createSlice({
  name: 'LoginSlice',
  initialState: {
    isAuth: false,
  },
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

// reducer: LoginReducer переименовали сходу сразу же и моментально
export const { reducer: LoginReducer, actions: LoginActions } = LoginSlice;
