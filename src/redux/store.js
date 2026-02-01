import { configureStore } from '@reduxjs/toolkit';
import userReducer from './usersSlice';
import todoReducer from './todoSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    todos: todoReducer,
  },
});
