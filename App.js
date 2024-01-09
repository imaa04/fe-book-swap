import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer, TabActions, useRoute } from '@react-navigation/native';
import LoginNavigator from './navigators/Navigator';
import { NativeWindStyleSheet } from "nativewind";
import { Button } from 'react-native';
// import SignupButton from './components/SignupButton';
import { UserProvider } from './context/userContext';
import { createNativeStackNavigator, StackNavigator } from '@react-navigation/native-stack';
import tailwind from 'twrnc';
import NavBar from './screens/NavBar';
// import Signup from "./screens/Signup";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <UserProvider>
      
    {/* <View className="inset-y-5 flex flex-1 bg-gray-950 justify-center items-center">
      <Text className='font-bold text-5xl text-gray-50'>Book Swap</Text>
      <StatusBar style="auto" />
    </View> */}
      
        <NavigationContainer >
          <Stack.Navigator style={{ flex: 1, justifyContent: `center`, }} screenOptions={{ headerShown: false}}>
            <Stack.Screen name='LoginNavigator' component={LoginNavigator} />
            {/* <Stack.Screen name='NavBar' component={NavBar}/> */}
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


