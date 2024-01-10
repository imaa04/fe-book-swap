import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button,
  Link,
} from "react-native";
import React, { useContext, createContext, useState,useEffect } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";

import {TokenContext} from '../context/authTokenContext'
import { useNavigation } from '@react-navigation/native'
import { postLogin } from "../api";
import useToken from "./UseToken";
import HomePage from "./HomePage";
import NavBar from "./NavBar.js";


const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const [buttonLock, setButtonLock] = useState("");
  const [input, setInput] = useState("");
  const [incorrectUser, setIncorrectUser] = useState(false);
  const { token, setToken } = useContext(UserContext);
  const [user, setUser] = useState({});
  const navigation = useNavigation();
  const { userContext, setUserContext } = useContext(UserContext);



  const handleSubmit = (event) => {
    setUser(() => {

      const updatedUser = { username: username, password: password };
      postLogin(updatedUser)
        .then((res) => {
          if (res) {
            navigation.navigate("NavBar");
            setUserContext(updatedUser);
          } else {
            setIncorrectUser(true);
            setTimeout(() => {
              setIncorrectUser(false);
            }, 7000);
          }
        })
        .catch((err) => {
          setIncorrectUser(true);
        });
    });

    event.preventDefault();
    setUsername("");
    setPassword("");
  };

  return (
    <View
      style={tailwind`flex-1 w-full items-center justify-center bg-gray-950`}
    >
      <View style={tailwind`px-4 w-full max-w-sm`}>
        <Text style={tailwind`text-2xl font-bold mb-6 text-gray-50`}>
          Login
        </Text>

        <View style={tailwind`flex flex-col gap-4`}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            color="white"
            placeholder="Username"
            placeholderTextColor="#FFF"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            color="white"
            placeholder="Password"
            placeholderTextColor="#FFF"
          />
          <Button
            title="Login"
            text="Login"
            variant="success"
            onPress={handleSubmit}
            disabled={false}
          />
        </View>
        <View>
          {incorrectUser ? (
            <Text style={{ color: "red" }}>
              Your username or password is incorrect, Try again
            </Text>
          ) : (
            <Text>...</Text>
          )}
        </View>

        <View style={tailwind`flex flex-row justify-between items-center my-8`}>
          <View style={tailwind`flex-row items-center`}>
            <Pressable>
              <Text
                onPress={() => navigation.navigate("Signup")}
                style={tailwind`text-gray-50 font-bold`}
              >
                Don't have an account? Sign up
              </Text>
            </Pressable>
            {/* <Pressable
              style={tailwind`bg-gray-50 h-6 w-6 rounded-sm mr-2`}
            ></Pressable> */}
            {/* <Text style={tailwind`text-gray-50`}>Remember me</Text> */}
          </View>
          {/* <Pressable>
            <Text style={tailwind`text-gray-50 font-bold`}>Reset password</Text>
          </Pressable> */}
        </View>
      </View>
      {/* <NavBar/> */}
    </View>
  );
};

export default LoginScreen;
