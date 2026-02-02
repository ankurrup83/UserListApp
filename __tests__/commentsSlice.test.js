import commentsReducer, { clearComments } from '../src/redux/commentsSlice';

describe('commentsSlice', () => {
    const initialState = {
        items: [],
        status: 'idle',
        error: null,
    };

    it('should return the initial state', () => {
        expect(commentsReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    it('should handle clearComments', () => {
        const modifiedState = {
            items: [{ id: 1 }],
            status: 'succeeded',
            error: null,
        };
        expect(commentsReducer(modifiedState, clearComments())).toEqual(initialState);
    });

    it('should handle fetchComments.fulfilled', () => {
        const mockComments = [{ id: 1, name: 'User' }];
        const action = { type: 'comments/fetchComments/fulfilled', payload: mockComments };
        const state = commentsReducer(initialState, action);
        expect(state.items).toEqual(mockComments);
        expect(state.status).toEqual('succeeded');
    });

    it('should handle updateComment.fulfilled', () => {
        const existingState = {
            items: [{ id: 1, body: 'Old' }],
            status: 'succeeded',
            error: null,
        };
        const updatedComment = { id: 1, body: 'New' };
        const action = { type: 'comments/updateComment/fulfilled', payload: updatedComment };
        const state = commentsReducer(existingState, action);
        expect(state.items[0].body).toEqual('New');
    });
});
