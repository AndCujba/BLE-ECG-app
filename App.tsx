import React from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import StartPage from './StartPage';
import HomePage from './HomePage';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EcgScreen from './EcgScreen';

const Stack = createNativeStackNavigator();
  

export default function App() {
  return (
    <>
    <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Start" component={StartPage} />
            <Stack.Screen options={{headerShown: false}} name="LogIn" component={LoginPage} />
            <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignupPage} />
            <Stack.Screen options={{headerShown: false}} name="Home" component={HomePage} /> 
            <Stack.Screen options={{headerShown: false}} name="ECG" component={EcgScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    
      </>
  )  
}  
 








