import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Button,
    Link,
    Image,
    TouchableOpacity

} from "react-native";
import React, { useContext, createContext, useState, useEffect } from "react";

import tailwind from "twrnc";
import { UserContext } from "../context/userContext";
import { useNavigation, useRoute } from '@react-navigation/native'
import { getBooks } from "../api";

const IndividualBook = ({navigation}) => {
    const { params } = useRoute()
    const infoReceived = params?.title
    const infoImage = params?.image
    const infoAuthor = params?.author
    const infoGenre = params?.genre
    const infoPublishDate = params?.publishDate
    const infoCondition = params?.condition
    const infoUsername = params?.username
    const infoDescription = params?.description
    return (
        <View style={tailwind`flex-1 w-full justify-left p-1 bg-gray-900 pt-6 pl-4 pr-4`}>
            <View style={tailwind`flex-row pt-5 p-4 mb-1 bg-white rounded-lg shadow-md `}>
                <Image source={{ uri: infoImage }} style={{ width: 100, height: 170 }} />

                <View style={tailwind`ml-2 flex-col pb-4 flex-shrink`}>
                    <Text style={tailwind`text-lg font-bold`}>{infoReceived}</Text>
                    <Text style={tailwind`text-sm font-bold`}>{infoAuthor}</Text>
                    <Text style={tailwind`text-sm`}>Genre: {infoGenre}</Text>
                    <Text style={tailwind`text-sm`}>Publish Date: {infoPublishDate}</Text>
                    <Text style={tailwind`text-sm`}>{infoDescription}</Text>
                    <Text style={tailwind`text-sm`}>Condition: {infoCondition}</Text>
                </View>

            </View>
            <View style={tailwind`flex pt-5 p-4 mb-1 bg-white rounded-lg shadow-md justify-center items-center`}>
                <Text style={tailwind`text-sm`}>This book was posted by: {infoUsername}</Text>
            </View>
            <View style={tailwind`flex pt-5 p-4 mb-1 bg-white rounded-lg shadow-md justify-center items-center`}>
                <Button title="Message poster" text="Click to borrow" 
                onPress={() => {
                  navigation.navigate("MessageCard", {
                    conversationWith: infoUsername,
                    title: infoReceived
                  })}}/>
        </View>
        </View>

    )
}

export default IndividualBook