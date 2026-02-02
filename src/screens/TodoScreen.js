import React, { useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  undoDelete,
  setTodos,
  updateTodo,
} from '../redux/todoSlice';
import { saveTodos, loadTodos } from '../utils/storage';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TodoItem from '../components/TodoItem';
import TodoInput from '../components/TodoInput';

export default function TodoScreen() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.list);
  const lastDeleted = useSelector(state => state.todos.lastDeleted);

  useEffect(() => {
    loadTodos().then(data => {
      if (data) dispatch(setTodos(data));
    });
  }, [dispatch]);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAddTodo = useCallback((text) => {
    dispatch(addTodo({ id: Date.now().toString(), text, completed: false }));
  }, [dispatch]);

  const handleToggleTodo = useCallback((id) => {
    dispatch(toggleTodo(id));
  }, [dispatch]);

  const handleDeleteTodo = useCallback((id) => {
    dispatch(deleteTodo(id));
  }, [dispatch]);

  const handleUpdateTodo = useCallback((id, text) => {
    dispatch(updateTodo({ id, text }));
  }, [dispatch]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const progress = total > 0 ? completed / total : 0;
    return { total, completed, progress };
  }, [todos]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>
          {stats.completed} of {stats.total} tasks completed
        </Text>

        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={stats.progress}
            width={null}
            height={10}
            borderRadius={5}
            color="#2563EB"
            unfilledColor="#E5E7EB"
            borderWidth={0}
          />
          <Text style={styles.progressText}>
            {Math.round(stats.progress * 100)}%
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <TodoInput onAdd={handleAddTodo} />

        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleUpdateTodo}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="clipboard-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
            </View>
          }
        />
      </View>

      {lastDeleted && (
        <View style={styles.undoContainer}>
          <Text style={styles.undoText}>Task deleted</Text>
          <TouchableOpacity
            onPress={() => dispatch(undoDelete())}
            style={styles.undoButton}
          >
            <Text style={styles.undoButtonText}>UNDO</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  progressText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#9CA3AF',
  },
  undoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  undoText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  undoButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  undoButtonText: {
    color: '#60A5FA',
    fontWeight: '700',
    fontSize: 14,
  },
});
