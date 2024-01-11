import React, { PropTypes } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
  Component,
  AppReg,
  Pressableistry,
} from "react-native";
import { executeNativeBackPress } from "react-native-screens";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import HomePage from "./HomePage";
import { Linking } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListBook from "./ListBook";
import Messages from "./Messages";
import Profile from "./Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import IndividualBook from "./IndividualBook";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomePage") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "ListBook") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown:false
      })}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{ showlabel: false, headerShown: false}}
      />
      <Tab.Screen
        name="ListBook"
        component={ListBook}
        options={{ showlabel: false }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{ showlabel: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ showlabel: false }}
      />
    </Tab.Navigator>
  );
};
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => ('HomePage')}  style={styles.button}>
//         <Text style={styles.buttonText}>Home</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Upload</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Messages</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#3498DB',
//     height: 50,
//     alignItems: 'center',
//   },
//   button: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

export default NavBar;
