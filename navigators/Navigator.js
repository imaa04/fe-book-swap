
import React from "react"
import { createNativeStackNavigator, StackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../screens/Login";
import Signup from "../screens/Signup";
import HomePage from "../screens/HomePage";
import NavBar from "../screens/NavBar";
import MessageCard from "../screens/MessageCard";
import IndividualBook from "../screens/IndividualBook";


const LoginStack = createNativeStackNavigator();


export default function LoginNavigator() {
  return (
    <LoginStack.Navigator
      style={{ flex: 1, justifyContent: `center` }}
      screenOptions={{ headerShown: true }}
      initialRouteName="SignUpScreen"
    >
      <LoginStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login", showlabel: false }}
      />
      <LoginStack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup", showlabel: false }}
      />
      <LoginStack.Screen
        name="NavBar"
        component={NavBar}
        options={{ title: "NavBar", showlabel: false }}
      />
          <LoginStack.Screen name='HomePage' component={HomePage} options={{ title: "", showlabel: false }} />
      <LoginStack.Screen name='IndividualBook' component={IndividualBook} options={{ title: "" }} />
      <LoginStack.Screen
        name="MessageCard"
        component={MessageCard}
        options={{ title: "Messages", showlabel: true, headerShown: true }}
      />
    </LoginStack.Navigator>
  );
}

