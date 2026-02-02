import React, { useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, StatusBar, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, resetPosts, incrementPage } from '../redux/postsSlice';
import PostItem from '../components/PostItem';

const PAGE_SIZE = 10;

export default function PostListScreen({ navigation }) {
    const dispatch = useDispatch();
    const { items: posts, status, hasMore, page } = useSelector((state) => state.posts);

    const loadPosts = useCallback((pageNumber) => {
        dispatch(fetchPosts({ page: pageNumber, limit: PAGE_SIZE }));
    }, [dispatch]);

    useEffect(() => {
        if (posts.length === 0) {
            loadPosts(1);
        }
    }, [loadPosts, posts.length]);

    const handleRefresh = () => {
        dispatch(resetPosts());
        loadPosts(1);
    };

    const handleLoadMore = () => {
        if (status !== 'loading' && hasMore) {
            const nextPage = page + 1;
            dispatch(incrementPage());
            dispatch(fetchPosts({ page: nextPage, limit: PAGE_SIZE }));
        }
    };

    const renderFooter = () => {
        if (status !== 'loading' || page === 1) return <View style={{ height: 20 }} />;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#6366F1" />
            </View>
        );
    };

    if (status === 'loading' && page === 1 && posts.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6366F1" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
            <FlatList
                data={posts}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('Comments', { postId: item.id })}
                    >
                        <PostItem item={item} />
                    </TouchableOpacity>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={status === 'loading' && page === 1 && posts.length > 0}
                        onRefresh={handleRefresh}
                        colors={['#6366F1']}
                        tintColor="#6366F1"
                    />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
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
    footerLoader: {
        paddingVertical: 20,
        alignItems: 'center',
    }
});
