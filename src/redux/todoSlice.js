import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],
    lastDeleted: null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.list = action.payload;
    },
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find(t => t.id === action.payload);
      todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      state.lastDeleted = state.list.find(t => t.id === action.payload);
      state.list = state.list.filter(t => t.id !== action.payload);
    },
    undoDelete: (state) => {
      if (state.lastDeleted) {
        state.list.push(state.lastDeleted);
        state.lastDeleted = null;
      }
    },
  },
});

export const {
  setTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  undoDelete,
} = todoSlice.actions;

export default todoSlice.reducer;
