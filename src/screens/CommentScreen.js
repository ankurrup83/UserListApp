import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, clearComments } from '../redux/commentsSlice';
import EditCommentModal from './EditCommentModal';
import CommentItem from '../components/CommentItem';

export default function CommentScreen({ route }) {
    const { postId } = route.params;
    const dispatch = useDispatch();
    const { items: comments, status } = useSelector((state) => state.comments);
    const [selectedComment, setSelectedComment] = useState(null);

    useEffect(() => {
        dispatch(fetchComments(postId));
        return () => {
            dispatch(clearComments());
        };
    }, [dispatch, postId]);

    if (status === 'loading' && comments.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6366F1" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <CommentItem
                        item={item}
                        onEdit={() => setSelectedComment(item)}
                    />
                )}
            />

            {selectedComment && (
                <EditCommentModal
                    comment={selectedComment}
                    onClose={() => setSelectedComment(null)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
    },
    listContent: {
        paddingVertical: 10,
    },
});
