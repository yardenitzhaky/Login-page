import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import SuccessScreen from './SuccessScreen';

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Define the main App component
export default function App() {
  return (
    // Wrap the navigator in a NavigationContainer to manage navigation state
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{
          headerShown: false // Hide the header for all screens
        }}
      >
        {/* Define the screens in the stack navigator */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}