import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Detail from '../Screens/detail';

import Home from '../Screens/home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen 
            options={{headerShown: false}}
            name="home"
            component={Home} />
            <Stack.Screen 
            options={{headerShown: false}}
            name="detail"
            component={Detail} />
        </Stack.Navigator>

    );
}

const AppTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home"
             component={HomeStack}
             options={{
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Icon name="home" color={color} size={size} />
                ),
             }}
              />
        </Tab.Navigator>
    );
};

const AppNavigationContainer = () => {
    return <AppTabs/>;
};

export default AppNavigationContainer;