import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page = 1) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`
    );
    // console.log("res:>>>>>>>>", await res.json());
    return res.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    page: 1,
    loading: false,
    error: null,
    hasMore: true,
  },
  reducers: {
    resetUsers(state) {
      state.list = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.list = [...state.list, ...action.payload];
          state.page += 1;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
