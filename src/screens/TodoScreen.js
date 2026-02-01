import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, undoDelete, setTodos } from '../redux/todoSlice';
import { saveTodos, loadTodos } from '../utils/storage';
import * as Progress from 'react-native-progress';

export default function TodoScreen() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.list);
  const [text, setText] = useState('');

  useEffect(() => {
    loadTodos().then(data => dispatch(setTodos(data)));
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const completed = todos.filter(t => t.completed).length;
  const progress = todos.length ? completed / todos.length : 0;

  return (
    <View style={{ padding: 20 }}>
      <Progress.Bar progress={progress} width={300} />

      <TextInput
        placeholder="New Todo"
        value={text}
        onChangeText={setText}
      />

      <Button
        title="Add"
        onPress={() => {
          dispatch(addTodo({ id: Date.now(), text, completed: false }));
          setText('');
        }}
      />

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text onPress={() => dispatch(toggleTodo(item.id))}>
            {item.completed ? '✅' : '⬜'} {item.text}
          </Text>
        )}
      />

      <Button title="Undo Delete" onPress={() => dispatch(undoDelete())} />
    </View>
  );
}
