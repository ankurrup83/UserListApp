import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, resetUsers } from '../redux/usersSlice';

export default function UserListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { list, page, loading, error,hasMore ,users} = useSelector(state => state.users);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, []);

  const loadMore = () => {
  if (!loading && hasMore) {
    dispatch(fetchUsers());
  }
};

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(resetUsers());
    dispatch(fetchUsers(1)).finally(() => setRefreshing(false));
  };

  const filteredUsers = list.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search user"
        value={search}
        onChangeText={setSearch}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('UserDetail', { user: item })}
          >
            <Text style={{ padding: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
    </View>
  );
}
