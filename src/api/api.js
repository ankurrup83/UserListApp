const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (page = 1, limit = 10) => {
    const res = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
};

export const fetchCommentsByPost = async (postId) => {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    if (!res.ok) throw new Error('Failed to fetch comments');
    return res.json();
};

export const updateComment = async (commentId, body) => {
    const res = await fetch(`${BASE_URL}/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error('Failed to update comment');
    return res.json();
};
