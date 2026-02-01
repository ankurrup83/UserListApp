import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`
      );
      return await res.json();
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, ...action.payload];
        state.page += 1;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
