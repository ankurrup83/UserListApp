import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTodos = async (todos) => {
  await AsyncStorage.setItem('TODOS', JSON.stringify(todos));
};

export const loadTodos = async () => {
  const data = await AsyncStorage.getItem('TODOS');
  return data ? JSON.parse(data) : [];
};
