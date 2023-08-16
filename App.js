import React from "react";
import { Text, View } from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import HomeScreen from './src/screens/HomeScreen';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }} >
        <Stack.Screen name="Home" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />






      </Stack.Navigator>


    </NavigationContainer>
  )
};
export default App;