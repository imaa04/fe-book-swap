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
    KeyboardAvoidingView,
} from "react-native";
import React, { useContext, createContext, useState,useEffect } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";
import { useNavigation } from '@react-navigation/native'
import { getBooks } from "../api";
import BookList from "./BookList";
import SearchBarHomepage from "./SearchBarHomepage";

const HomePage = () => {
const [books,setBooks]=useState([])
const [searchResults, setSearchResults] = useState([])
    const [selectedGenres, setSelectedGenres] = useState(null)
useEffect(()=>{

    getBooks()

    .then((res)=>{
        setBooks(res)
    })
}, [books])
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}
            style={tailwind`mx-auto flex-1 w-full items-center justify-center bg-gray-900`}
        >
            <Text style={tailwind`text-4xl font-bold mb-6 text-gray-50 pt-20`}>Cluster Books 📖</Text>
        <ScrollView style={tailwind`flex-1 w-full p-1 bg-gray-900 pt-5`}>
            <SearchBarHomepage setSearchResults={setSearchResults} setSelectedGenres={setSelectedGenres} selectedGenres={selectedGenres}/>
                <View style={tailwind`flex-1 w-full p-1 bg-gray-900 pt-2 px-4`}>
            {(() => {
                if(searchResults.length > 0) {
                    return searchResults.map((result) => {
                            return <BookList key={result._id} title={result.title} image={result.book_img} author={result.author} genre={result.genre} publishDate={result.published_date} condition={result.condition} username={result.username} description={result.description} />
                        })
                        
                    
                    
                }
                else if (books) {
                    // Render books if the books state exists and has items
                    return books.map((book) => (
                        <BookList key={book._id} title={book.title} image={book.book_img} author={book.author} genre={book.genre} publishDate={book.published_date} condition={book.condition} username={book.username} description={book.description}/>
                    ));
                } else {
                    // Render a message if the books state is empty
                    return <Text>No books available</Text>;
                }
            })()}
        
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default HomePage