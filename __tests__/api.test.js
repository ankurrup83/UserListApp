import { fetchPosts, fetchCommentsByPost, updateComment } from '../src/api/api';

global.fetch = jest.fn();

describe('API Service', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('fetchPosts should return data on success', async () => {
        const mockData = [{ id: 1, title: 'Test Post' }];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const result = await fetchPosts(1, 10);
        expect(result).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/posts?_page=1&_limit=10'));
    });

    it('fetchCommentsByPost should return data on success', async () => {
        const mockData = [{ id: 1, name: 'Test Comment' }];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const result = await fetchCommentsByPost(1);
        expect(result).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/posts/1/comments'));
    });

    it('updateComment should call fetch with PUT', async () => {
        const mockData = { id: 1, body: 'Updated' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const result = await updateComment(1, { body: 'Updated' });
        expect(result).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/comments/1'),
            expect.objectContaining({ method: 'PUT' })
        );
    });

    it('should throw error if response is not ok', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
        });

        await expect(fetchPosts()).rejects.toThrow('Failed to fetch posts');
    });
});
