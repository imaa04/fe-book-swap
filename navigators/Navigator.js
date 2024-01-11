import React, { useState } from "react";
import {
  createNativeStackNavigator,
  StackNavigator,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/Login";
import Signup from "../screens/Signup";
import HomePage from "../screens/HomePage";
import NavBar from "../screens/NavBar";
import MessageCard from "../screens/MessageCard";
import IndividualBook from "../screens/IndividualBook";
import Messages from "../screens/Messages";

const LoginStack = createNativeStackNavigator();


export default function Navigator() {
  //const [trigger, setTrigger] = useState("banana");


  return (
    <LoginStack.Navigator
      style={{ flex: 1, justifyContent: `center` }}
      screenOptions={{ headerShown: false }}
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

      <LoginStack.Screen
        name="HomePage"
        component={HomePage}
        options={{ title: "Home", showlabel: false }}
      />
      <LoginStack.Screen name="Messages">
        {(props) => (
          <Messages
            {...props}
            trigger={trigger}
            options={{ title: "Messages" }}
          />
        )}
      </LoginStack.Screen>

      <LoginStack.Screen
        name="IndividualBook"
        component={IndividualBook}
        options={{ title: "", headerShown: true }}
      />

      <LoginStack.Screen
        name="MessageCard"
        component={MessageCard}
        options={{ title: "Messages", showlabel: true, headerShown: true }}
      />
    </LoginStack.Navigator>
  );
}
