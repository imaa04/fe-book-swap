import React from "react"
import {createNativeStackNavigator, StackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../screens/Login";
import Signup from "../screens/Signup";
import HomePage from "../screens/HomePage";


const LoginStack = createNativeStackNavigator()

export default function LoginNavigator (){
    return (
            <LoginStack.Navigator style={{ flex: 1, justifyContent: `center`}} 
            initialRouteName="SignUpScreen"
            screenOptions={{ headerTransparent: true }}>
                <LoginStack.Screen name='Login' component={LoginScreen} options={{title:"Login"}}/>
                <LoginStack.Screen name='Signup' component={Signup} options={{title:"Signup"}}/>
              <LoginStack.Screen name='HomePage' component={HomePage} options={{ title: "HomePage" }} />
            </LoginStack.Navigator>
    )
}