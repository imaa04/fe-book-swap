import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Button,
    Link,
    ScrollView,
} from "react-native";
import React, { useContext, createContext, useState, useEffect } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";
import { useNavigation } from '@react-navigation/native'
import { getBookBySearch } from "../api";
import BookList from "./BookList";

function SearchBarHomepage({setSearchResults}) {
    const [search, setSearch] = useState('')
    const handleSubmit = (event) => {
        setSearch(() => {
            getBookBySearch(search).then((res) => {
                setSearchResults(res)
            }).catch((err) => {
                setSearchResults([])
            })
        })
        event.preventDefault();


    }

    return (
        <View style={tailwind`px-4 w-full max-w-sm`}>
            <View style={tailwind`flex flex-col gap-2 mb-3 items-center justify-center mt-3 bg-white rounded-lg shadow-md `}>
                <Text style={tailwind`text-lg font-bold`}>Search title</Text>
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    color="black"
                    placeholder="Type title ..."
                    placeholderTextColor="black"
                />
                <Button title="Search" text="Search" variant="success" onPress={handleSubmit} disabled={false} />
            </View>
        </View>
    )
}

export default SearchBarHomepage