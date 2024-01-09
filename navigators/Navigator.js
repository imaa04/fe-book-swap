import React from "react"
import {createNativeStackNavigator, StackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../screens/Login";
import Signup from "../screens/Signup";
import HomePage from "../screens/HomePage";
import IndividualBook from "../screens/IndividualBook";


const LoginStack = createNativeStackNavigator()

export default function LoginNavigator (){
    return (
            <LoginStack.Navigator style={{ flex: 1, justifyContent: `center`}} 
            initialRouteName="Login"
            screenOptions={{ headerShown: false}}>
                <LoginStack.Screen name='Login' component={LoginScreen} options={{title:"Login"}}/>
                <LoginStack.Screen name='Signup' component={Signup} options={{title:"Signup"}}/>
              <LoginStack.Screen name='HomePage' component={HomePage} options={{ title: "HomePage" }} />
            {/* <LoginStack.Screen name='IndividualBook' component={IndividualBook} options={{ title: "IndividualBook" }} /> */}

            </LoginStack.Navigator>
    )
}