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
import React, { useContext,createContext, useState } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";
import {useNavigation} from '@react-navigation/native'


const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonLock, setButtonLock] = useState('')
  const [input, setInput] = useState('')
  const {token,setToken} = useContext(UserContext);
  const {user, setUser} = useContext(UserContext);
const navigation = useNavigation()
    
  const handleSubmit = (event) => {
    event.preventDefault();
    setUser({username,password})
    setUsername('')
    setPassword('')
  }

  // useEffect(()=>{
  //   getLogin().then((authToken)=>{
  //   setToken(authToken)
  //   })
  // })
  console.log(username,'username', password,'password',user);

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
          <Button title="Login" text="Login" variant="success" onPress={handleSubmit} disabled={false} />
        </View>

        <View style={tailwind`flex flex-row justify-between items-center my-8`}>
          <View style={tailwind`flex-row items-center`}>
            <Pressable>
              <Text onPress={()=>navigation.navigate('Signup')} style={tailwind`text-gray-50 font-bold`}>
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
    </View>
  );
};

export default LoginScreen;
