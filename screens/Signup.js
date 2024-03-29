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
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from "react-native-picker-select";
import { postUser } from "../api";
import { TouchableOpacity } from "react-native";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ user, setUser ] = useState({});
  const [incorrectUser, setIncorrectUser] = useState(false)
  const [location, setLocation] = useState("");
  const [submitAlert, setSubmitAlert] = useState('')
  const [isSecureEntry, setIsSecureEntry] = useState(true)
  const navigation = useNavigation()

 
  const handleSubmit = (event) => {
    setUser(() => {
      const updatedUser = { username: username, location: location, password: password }
      postUser(updatedUser).then((res) => {
        if (res) {
          setSubmitAlert('Account created successfully.')

          setTimeout(() => {
            setSubmitAlert('')
            navigation.navigate('Login')
          }, 2000);
          
        } 

      }).catch((err) => {
        setIncorrectUser(true)
        setTimeout(() => {
          setIncorrectUser(false)
        }, 2000);

        
      })
    })
    event.preventDefault();
    setUsername('')
    setPassword('')
    setLocation('')
  };


  // console.log(location,'location')

  return (
    <View
      style={tailwind`flex-1 w-full items-center justify-center bg-gray-900`}
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
          secureTextEntry={isSecureEntry}
          icon={
            <TouchableOpacity
              onPress={() => {
                setIsSecureEntry((prev) => !prev);
              }}>
              <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
            </TouchableOpacity>
          }
        />
        <View>
          {incorrectUser ? (
            <Text style={{ color: 'red' }}>Please fill in all required fields</Text>
          ) : (
            <Text>...</Text>
          )}
        </View>
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
