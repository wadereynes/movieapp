
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigationContainer from './src/Router/AppNavigationContainer';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigationContainer />
    </NavigationContainer>
  );
};

export default App;





