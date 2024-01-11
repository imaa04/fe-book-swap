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
        <View style={tailwind`mx-auto flex-1 w-full  bg-gray-900 pt-20 justify-center items-center`}>
            <Text style={tailwind`text-white text-lg font-bold`}>{userToDisplay}</Text>
            <UserBio userDetails={userDetails}/>
      <UserListings/>
            <Pressable>
              <Text onPress={() => navigation.navigate('Login')} style={tailwind`text-white font-bold`}>
                Sign Out
              </Text>
            </Pressable>
        </View>
    )
}

export default Profile;