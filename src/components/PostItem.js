import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostItem = ({ item }) => {
    return (
        <View style={styles.container}>
            {/* Label for Title */}
            <Text style={styles.label}>Title</Text>

            {/* Box for Title Value */}
            <View style={styles.box}>
                <Text style={styles.titleText}>{item.title}</Text>
            </View>

            {/* Content Box for Body */}
            <View style={[styles.box, styles.bodyBox]}>
                <Text style={styles.bodyText} numberOfLines={3}>
                    {item.body}
                </Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.moreText}>View Comments →</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F3F4F6',
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
        marginLeft: 4,
    },
    box: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    bodyBox: {
        minHeight: 80,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        textTransform: 'capitalize',
    },
    bodyText: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    footer: {
        alignItems: 'flex-end',
        marginTop: -4,
    },
    moreText: {
        color: '#6366F1',
        fontWeight: '600',
        fontSize: 13,
    }
});

export default React.memo(PostItem);
