import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import ConversationList from './Messages/ConversationList';
import Messages from './Messages/ConversationCard';
import ConversationCard from './Messages/ConversationCard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen
          name="Conversation List"
          component={ConversationList}
        />
        <Stack.Screen
          name="ConversationCard"
          component={ConversationCard}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
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
