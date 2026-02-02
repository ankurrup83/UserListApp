import React, { useState, memo } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TodoInput = memo(({ onAdd }) => {
    const [text, setText] = useState('');

    const handleAdd = () => {
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Add a new task..."
                placeholderTextColor="#9CA3AF"
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleAdd}
            />
            <TouchableOpacity
                onPress={handleAdd}
                style={[styles.addButton, !text.trim() && styles.disabledButton]}
                disabled={!text.trim()}
            >
                <Ionicons name="add" size={28} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 56,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },
    addButton: {
        backgroundColor: '#2563EB',
        borderRadius: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#93C5FD',
    },
});

export default TodoInput;
