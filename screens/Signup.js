import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button,
  Link,
  Alert
} from "react-native";
import React, { createContext, useContext, useState } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";
import Locations from "../data/locations";
import RNPickerSelect from "react-native-picker-select";
import { postUser } from "../api";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  // const [email, setEmail] = useState("")
  const [location, setLocation] = useState("");
  const [submitAlert, setSubmitAlert] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser({ username, password, location });
    setUsername("");
    setPassword("");
    // setEmail("")
    postUser(user).then((res) => {
      return res.user
    })
    setSubmitAlert('Account created successfully.')
  };


  // console.log(location,'location')

  return (
    <View
      style={tailwind`flex-1 w-full items-center justify-center bg-gray-950`}
    >
      <View style={tailwind`px-4 w-full max-w-sm`}>
        <Text style={tailwind`text-2xl font-bold mb-6 text-gray-50`}>
          Signup
        </Text>
      </View>
      <View style={tailwind`flex flex-col gap-4`}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          color="white"
          placeholder="Username"
          placeholderTextColor="#FFF"
        />
        {/* <TextInput
          value={email}
          onChangeText={setEmail}
          color="white"
          placeholder="Email"
          placeholderTextColor="#FFF"
        /> */}
        <RNPickerSelect
          items={Locations}
          value={location}
          onValueChange={(value) => setLocation(value)}
          textInputProps={{ style: { color: 'white' } }}
          placeholder={{ label: 'Select your location...' }}
          placeholderTextColor="red"
        />

        {/* {location !== null && (
        <Text style={{ color: 'white', marginTop: 10 }}>
          Selected Location: {location}
        </Text>
      )} */}


        <TextInput
          value={password}
          onChangeText={setPassword}
          color="white"
          placeholder="Password"
          placeholderTextColor="#FFF"
        />
        <Button
          title="Signup"
          text="Signup"
          variant="success"
          onPress={handleSubmit}
          disabled={false}
        />
        <Text style={{ color: 'white' }}>{submitAlert}</Text>
      </View>
      {/* <Text onPress={()=>navigation.navigate('Login')} style={tailwind`text-gray-50 font-bold`}>
                Account created successfully.
                Please return to login page.
              </Text> */}
    </View>
  );
};

export default Signup;
