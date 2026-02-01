import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import UserListScreen from '../screens/UserListScreen';
import TodoScreen from '../screens/TodoScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Users') {
            iconName = 'people-outline';
          } else if (route.name === 'Todos') {
            iconName = 'checkmark-done-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Users" component={UserListScreen} />
      <Tab.Screen name="Todos" component={TodoScreen} />
    </Tab.Navigator>
  );
}
