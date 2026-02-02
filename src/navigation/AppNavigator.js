import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostListScreen from '../screens/PostListScreen';
import CommentScreen from '../screens/CommentScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },
                headerTitleStyle: {
                    fontWeight: '800',
                    fontSize: 18,
                    color: '#111827',
                },
                headerShadowVisible: false,
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name="Posts" component={PostListScreen} options={{ title: 'Explore Posts' }} />
            <Stack.Screen name="Comments" component={CommentScreen} />
        </Stack.Navigator>
    );
}
