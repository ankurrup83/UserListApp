import postsReducer, { resetPosts, incrementPage } from '../src/redux/postsSlice';

describe('postsSlice', () => {
    const initialState = {
        items: [],
        status: 'idle',
        error: null,
        hasMore: true,
        page: 1,
    };

    it('should return the initial state', () => {
        expect(postsReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    it('should handle resetPosts', () => {
        const modifiedState = {
            items: [{ id: 1 }],
            status: 'succeeded',
            error: null,
            hasMore: false,
            page: 5,
        };
        expect(postsReducer(modifiedState, resetPosts())).toEqual(initialState);
    });

    it('should handle incrementPage', () => {
        const actual = postsReducer(initialState, incrementPage());
        expect(actual.page).toEqual(2);
    });

    it('should handle fetchPosts.pending', () => {
        const action = { type: 'posts/fetchPosts/pending' };
        const state = postsReducer(initialState, action);
        expect(state.status).toEqual('loading');
    });

    it('should handle fetchPosts.fulfilled (page 1)', () => {
        const mockPosts = [{ id: 1, title: 'Test' }];
        const action = {
            type: 'posts/fetchPosts/fulfilled',
            payload: mockPosts,
            meta: { arg: { page: 1, limit: 10 } }
        };
        const state = postsReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.items).toEqual(mockPosts);
        expect(state.hasMore).toBe(false); // because 1 < 10
    });

    it('should handle fetchPosts.fulfilled (page > 1)', () => {
        const existingState = { ...initialState, items: [{ id: 1 }] };
        const mockPosts = [{ id: 2 }];
        const action = {
            type: 'posts/fetchPosts/fulfilled',
            payload: mockPosts,
            meta: { arg: { page: 2, limit: 10 } }
        };
        const state = postsReducer(existingState, action);
        expect(state.items).toEqual([{ id: 1 }, { id: 2 }]);
    });
});
