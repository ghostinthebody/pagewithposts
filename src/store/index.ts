import { configureStore } from '@reduxjs/toolkit';
import { PostIdPageReducer } from '../Pages/PostIdPage/slice/PostIdPageSlice';
import { LoginReducer } from '../Pages/Login/slice/LoginSlice'
import { PostReducer } from '../Pages/Posts/slice/PostSlice';
import { OLDPostsReducer } from '../Pages/OLDPost/slice/OLDPostsSlice';
import { TodosReducer } from '../Pages/TodoListPage/slice/TodosSlice';

export default configureStore({
  reducer: {
    postIdPage: PostIdPageReducer,
    login: LoginReducer,
    post: PostReducer,
    oldPost: OLDPostsReducer,
    todos: TodosReducer,
  },
});


