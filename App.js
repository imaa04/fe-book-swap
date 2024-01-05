import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './components/login';
import { Button } from 'react-native';
import signupButton from './components/signupButton';
import { UserProvider } from './context/userContext';

export default function App() {
  return (
    <UserProvider>
    <View className="inset-y-5 flex flex-1 bg-gray-950 justify-center items-center">
      <Text className='font-bold text-5xl text-gray-50'>Book Swap</Text>
      <StatusBar style="auto" />
      <LoginScreen />
  
    </View>
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
