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
import React, { useContext, createContext, useState, useEffect } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";
import { useNavigation } from '@react-navigation/native'
import { getBooks, getUsers } from "../api";
import UserBio from "./UserBio";
import UserListings from "./UserListings";

const Profile = ({user, navigation}) => {

    const {userContext} = useContext(UserContext)
    const userToDisplay = user ? user : userContext.username
    const [userDetails, setUserDetails] = useState({})

useEffect(()=>{
    getUsers(userToDisplay).then((res)=>{
        setUserDetails(res.data.users[0])
    })
    getBooks(userToDisplay).then((res)=>{
        console.log(res.data)
    })
},[])

    return (
        <View>
      <UserBio userDetails={userDetails}/>
      <UserListings/>
        <Pressable>
              <Text onPress={() => navigation.navigate('Login')} style={tailwind` font-bold`}>
                Sign Out
              </Text>
            </Pressable>
        </View>
    )
}

export default Profile;