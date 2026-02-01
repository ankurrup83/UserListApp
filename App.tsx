/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';
import { store } from './src/redux/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer>
       <StackNavigator />
      </NavigationContainer>
    </Provider>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
