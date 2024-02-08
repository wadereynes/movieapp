
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigationContainer from './src/Router/AppNavigationContainer';


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your apps!</Text>
//       <StatusBar style="auto" />
//     </View>
//     // <NavigationContainer>
//     //   <AppNavigationContainer/>
//     // </NavigationContainer>
//   );
// }

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigationContainer />
    </NavigationContainer>
  );
};

export default App;





