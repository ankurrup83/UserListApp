import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment } from '../redux/commentsSlice';
import { KeyboardAvoidingView, Modal, StyleSheet, TextInput, TouchableOpacity, View, Text, Alert, Platform } from 'react-native';

export default function EditCommentModal({ comment, onClose }) {
    const dispatch = useDispatch();
    const [text, setText] = useState(comment.body);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!text.trim()) {
            Alert.alert('Error', 'Comment cannot be empty');
            return;
        }

        try {
            setLoading(true);
            await dispatch(updateComment({
                commentId: comment.id,
                body: { ...comment, body: text }
            })).unwrap();

            Alert.alert('Success', 'Comment updated successfully');
            onClose();
        } catch (e) {
            Alert.alert('Error', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible transparent animationType="fade">
            <View style={styles.overlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContent}
                >
                    <View style={styles.card}>
                        <Text style={styles.title}>Edit Comment</Text>

                        <TextInput
                            value={text}
                            onChangeText={setText}
                            multiline
                            placeholder="Type your comment here..."
                            placeholderTextColor="#9CA3AF"
                            style={styles.input}
                        />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={onClose}
                                disabled={loading}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                <Text style={styles.submitButtonText}>
                                    {loading ? 'Submitting...' : 'Submit'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        padding: 24,
    },
    modalContent: {
        width: '100%',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 12,
        fontSize: 14,
        color: '#374151',
        minHeight: 120,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        minWidth: 100,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#F3F4F6',
    },
    submitButton: {
        backgroundColor: '#6366F1',
    },
    cancelButtonText: {
        color: '#4B5563',
        fontWeight: '600',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});
