import React from "react";
import { Text, View } from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import HomeScreen from './src/screens/HomeScreen';
import Attendance from './src/screens/Attendance';
import Group from "./src/screens/Group";
import UserScreen from "./src/screens/UserScreen";
import Profile from "./src/screens/Profile";







const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Dashboard" component={HomeScreen} options={{
        headerShown: false,
        drawerIcon: () => null
      }} />
      <Drawer.Screen name="Calender" component={HomeScreen} options={{
        headerShown: false,
        drawerIcon: () => null
      }} />
      <Drawer.Screen name="CheckIn" component={HomeScreen} options={{
        headerShown: false,
        drawerIcon: () => null
      }} />
      <Drawer.Screen name="Topic for Discussion" component={HomeScreen} options={{
        headerShown: false,
        drawerIcon: () => null
      }} />
      <Drawer.Screen name="Goals" component={HomeScreen} options={{
        headerShown: false,
        drawerIcon: () => null
      }} />

    </Drawer.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={DrawerNavigation} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Atten" component={Attendance} />
        <Stack.Screen name="Group" component={Group} />

      </Stack.Navigator>
    </NavigationContainer>



  )
};
export default App;