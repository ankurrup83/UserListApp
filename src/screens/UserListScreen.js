import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, resetUsers } from '../redux/usersSlice';
import UserCard from '../card/UserCard';

export default function UserListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { list, page, loading, error, hasMore } = useSelector(state => state.users);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const onEndReachedCalledDuringMomentum = useRef(false);

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, []);

  const loadMore = () => {
    if (search.length === 0 && !loading && hasMore) {
      dispatch(fetchUsers(page));
    }
  };


  const onRefresh = () => {
    setSearch('');
    setRefreshing(true);
    dispatch(resetUsers());
    dispatch(fetchUsers(1)).finally(() => setRefreshing(false));
  };

  const filteredUsers = list.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search users..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
        />
      </View>

      <FlatList
        data={filteredUsers}
        extraData={list}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum.current) {
            loadMore();
            onEndReachedCalledDuringMomentum.current = true;
          }
        }}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() => navigation.navigate('UserDetail', { user: item })}
          />
        )}
        ListFooterComponent={
          loading ? <ActivityIndicator style={{ marginVertical: 16 }} /> : null
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchBar: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },
  listContent: {
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '500',
  },
});
