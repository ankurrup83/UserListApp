import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts as fetchPostsCall } from '../api/api';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            return await fetchPostsCall(page, limit);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        hasMore: true,
        page: 1,
    },
    reducers: {
        resetPosts: (state) => {
            state.items = [];
            state.page = 1;
            state.hasMore = true;
            state.status = 'idle';
        },
        incrementPage: (state) => {
            state.page += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.meta.arg.page === 1) {
                    state.items = action.payload;
                } else {
                    state.items = [...state.items, ...action.payload];
                }
                if (action.payload.length < action.meta.arg.limit) {
                    state.hasMore = false;
                }
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetPosts, incrementPage } = postsSlice.actions;
export default postsSlice.reducer;
