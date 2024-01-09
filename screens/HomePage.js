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

const HomePage = () => {
const [books,setBooks]=useState([])

useEffect(()=>{

    getBooks()

    .then((books)=>{
        
        // setBooks([books])
        console.log(books);
        setBooks(books)
    

    })
}, [books])

    
    return (
        <ScrollView>
            <View style={tailwind`flex-1 w-full justify-left p-1 bg-yellow-100 pt-6`}>
            {(() => {
                if (books) {
                    // Render books if the books state exists and has items
                    return books.map((book) => (
                        <BookList key={book._id} title={book.title} image={book.book_img} author={book.author}/>
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