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
import RNPickerSelect from "react-native-picker-select";
import Locations from "../data/locations";
import { getGenres } from "../api";
import { getBookByGenre } from "../api";

function SearchBarHomepage({ setSearchResults, setSelectedGenres, selectedGenres }) {
    const [search, setSearch] = useState('')
    const [genre, setGenre] = useState([])
    useEffect(() => {
        getGenres()
            .then((res) => {
                setGenre(res)
            })
    }, [genre])

    const handleSubmit = (event) => {
        if (selectedGenres) {
            setSearch(() => {
                getBookByGenre(selectedGenres).then((res) => {
                    setSearchResults(res)
                }).catch((err) => {
                    setSearchResults([])
                })
            })
        } else {
            setSearch(() => {
                getBookBySearch(search).then((res) => {
                    setSearchResults(res)
                }).catch((err) => {
                    setSearchResults([])
                })
            })
        }

        event.preventDefault();


    }

    return (
        <View style={tailwind`px-4 w-full max-w-sm `}>
            <View style={tailwind`flex flex-col gap-2 mb-3 items-center justify-center mt-3 rounded-lg shadow-md `}>
                <Text style={tailwind`text-lg font-bold text-gray-50`}>Search title OR Select genre </Text>
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    style={styles.underline}
                    color="white"
                    placeholder="Type title ..."
                    placeholderTextColor="white"
                />
                {/* <Text style={tailwind`text-decoration-line-overline text-center `}>
                    <Text style={tailwind`invisible`}>_</Text>
                </Text> */}
                <RNPickerSelect
                //style={tailwind `border-2 border-rose-500`}
                    items={genre.map((genre) => (
                        {
                            label: genre,
                            value: genre,

                        }
                    ))}
                    value={selectedGenres}
                    onValueChange={(value) => setSelectedGenres(value)}
                    
                    textInputProps={{
                        style: {
                            color: 'white', paddingLeft: 20, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 50, height: 35, fontSize: 20,
                            fontSize: 20,
} }}
                    placeholder={{ label: 'Select your genre...' }}
                    placeholderTextColor="white"
                />
                <Button title="Search" text="Search" variant="success" onPress={handleSubmit} disabled={false} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    underline:{
        height: 35,
        fontSize: 20,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: 'white',
        width: '100%',
        paddingLeft: 20,
        marginTop: 10,
        marginBottom: 10
    }
    
})
export default SearchBarHomepage