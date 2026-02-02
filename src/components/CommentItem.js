import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CommentItem = ({ item, onEdit }) => {
    return (
        <View style={styles.container}>
            {/* Section for Name */}
            <Text style={styles.label}>Name</Text>
            <View style={styles.box}>
                <Text style={styles.valueText}>{item.name}</Text>
            </View>

            {/* Section for Email */}
            <Text style={styles.label}>Email</Text>
            <View style={styles.box}>
                <Text style={styles.valueText}>{item.email}</Text>
            </View>

            {/* Section for Comment */}
            <Text style={styles.label}>Comment</Text>
            <View style={[styles.box, styles.commentBox]}>
                <Text style={styles.valueText}>{item.body}</Text>
            </View>

            {/* Edit Action */}
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

            <View style={styles.divider} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 15,
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
        marginBottom: 16,
    },
    commentBox: {
        minHeight: 100,
    },
    valueText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },
    editButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#6366F1',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 20,
    },
    editButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        width: '100%',
    }
});

export default React.memo(CommentItem);
