import React from 'react';
import { View, Text } from 'react-native';

export default function UserDetailScreen({ route }) {
  const { user } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>
        Address: {user.address.street}, {user.address.city}
      </Text>
    </View>
  );
}
