import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TodoItem = memo(({ item, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editText, setEditText] = React.useState(item.text);

    const handleEdit = () => {
        if (isEditing) {
            onEdit(item.id, editText);
        }
        setIsEditing(!isEditing);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onToggle(item.id)} style={styles.content}>
                <Ionicons
                    name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={item.completed ? '#10B981' : '#9CA3AF'}
                />
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={editText}
                        onChangeText={setEditText}
                        autoFocus
                    />
                ) : (
                    <Text style={[styles.text, item.completed && styles.completedText]}>
                        {item.text}
                    </Text>
                )}
            </TouchableOpacity>

            <View style={styles.actions}>
                <TouchableOpacity onPress={handleEdit} style={styles.actionBtn}>
                    <Ionicons name={isEditing ? 'save-outline' : 'create-outline'} size={20} color="#3B82F6" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.actionBtn}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 12,
        marginBottom: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#1F2937',
        marginLeft: 12,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#9CA3AF',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
        marginLeft: 12,
        padding: 0,
    },
    actions: {
        flexDirection: 'row',
    },
    actionBtn: {
        padding: 8,
        marginLeft: 4,
    },
});

export default TodoItem;
