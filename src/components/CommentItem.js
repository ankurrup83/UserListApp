import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CommentItem = ({ item, onEdit }) => {
    return (
        <View style={styles.container}>
            <View style={styles.ticket}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.email} numberOfLines={1}>{item.email}</Text>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.punchHoleLeft} />
                    <View style={styles.dashedLine} />
                    <View style={styles.punchHoleRight} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.body}>{item.body}</Text>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                            <Text style={styles.editButtonText}>Edit Comment</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    ticket: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        padding: 16,
        backgroundColor: '#F9FAFB',
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        textTransform: 'capitalize',
    },
    email: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        backgroundColor: '#FFFFFF',
    },
    punchHoleLeft: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        marginLeft: -10,
    },
    punchHoleRight: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        marginRight: -10,
    },
    dashedLine: {
        flex: 1,
        height: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginHorizontal: 10,
    },
    content: {
        padding: 16,
    },
    body: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 22,
    },
    footer: {
        marginTop: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        alignItems: 'flex-end',
    },
    editButton: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    editButtonText: {
        color: '#4B5563',
        fontWeight: '600',
        fontSize: 13,
    }
});

export default React.memo(CommentItem);
