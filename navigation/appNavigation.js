import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StatusDetailScreen from '../screens/StatusDetailScreen';
import HistoryScreen from '../screens/HistoryScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="CreateAccount" options={{headerShown: false}} component={CreateAccountScreen} />
        <Stack.Screen name="Profile" options={{headerShown: false}} component={ProfileScreen} />
        <Stack.Screen name="StatusDetail" options={{headerShown: false}} component={StatusDetailScreen} />
        <Stack.Screen name="History" options={{headerShown: false}} component={HistoryScreen} />
        <Stack.Screen name="Notification" options={{headerShown: false}} component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}