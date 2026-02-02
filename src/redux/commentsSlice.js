import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCommentsByPost, updateComment as updateCommentCall } from '../api/api';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (postId, { rejectWithValue }) => {
        try {
            return await fetchCommentsByPost(postId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateComment = createAsyncThunk(
    'comments/updateComment',
    async ({ commentId, body }, { rejectWithValue }) => {
        try {
            return await updateCommentCall(commentId, body);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearComments: (state) => {
            state.items = [];
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const index = state.items.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
