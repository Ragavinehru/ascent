import React from "react";
import { Text, View } from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import HomeScreen from './src/screens/HomeScreen';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />

    </Drawer.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>



  )
};
export default App;