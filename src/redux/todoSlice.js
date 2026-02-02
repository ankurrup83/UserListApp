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
    updateTodo: (state, action) => {
      const { id, text, completed } = action.payload;
      const todo = state.list.find(t => t.id === id);
      if (todo) {
        if (text !== undefined) todo.text = text;
        if (completed !== undefined) todo.completed = completed;
      }
    },
    deleteTodo: (state, action) => {
      const index = state.list.findIndex(t => t.id === action.payload);
      if (index !== -1) {
        state.lastDeleted = { todo: state.list[index], index };
        state.list.splice(index, 1);
      }
    },
    undoDelete: (state) => {
      if (state.lastDeleted) {
        const { todo, index } = state.lastDeleted;
        state.list.splice(index, 0, todo);
        state.lastDeleted = null;
      }
    },
  },
});

export const {
  setTodos,
  addTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
  undoDelete,
} = todoSlice.actions;

export default todoSlice.reducer;
