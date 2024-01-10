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
useEffect(()=>{

    getBooks()

    .then((res)=>{
        setBooks(res)
    })
}, [books])
    
    return (
        <ScrollView style={tailwind`flex-1 w-full justify-left p-1 bg-gray-900 pt-2`}>
            <SearchBarHomepage setSearchResults={setSearchResults}/>
            <View>
            {(() => {
                if(searchResults.length > 0) {
                    return (
                        <BookList key={searchResults[0]._id} title={searchResults[0].title} image={searchResults[0].book_img} author={searchResults[0].author} genre={searchResults[0].genre} publishDate={searchResults[0].published_date} condition={searchResults[0].condition} username={searchResults[0].username} description={searchResults[0].description} />
                    )
                    
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
    )
}

export default HomePage