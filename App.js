import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './components/Login';
import { NativeWindStyleSheet } from "nativewind";
import { Button } from 'react-native';
import signupButton from './components/SignupButton';
import { UserProvider } from './context/userContext';
import { createNativeStackNavigator, StackNavigator } from '@react-navigation/native-stack';
import tailwind from 'twrnc';
import Signup from "./components/signup";
const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <UserProvider>
      
    {/* <View className="inset-y-5 flex flex-1 bg-gray-950 justify-center items-center">
      <Text className='font-bold text-5xl text-gray-50'>Book Swap</Text>
      <StatusBar style="auto" />
    </View> */}
      
        <NavigationContainer >
          <Stack.Navigator style={{ flex: 1, justifyContent: `center`, }}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen style={tailwind`text-gray-50 font-bold`} name="Sign up" component={Signup}  />
          
        
        </Stack.Navigator>
        </NavigationContainer>

    
    </UserProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


