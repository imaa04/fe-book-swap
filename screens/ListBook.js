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
  FlatList,
  Image
} from "react-native";
import React, { useContext, createContext, useState,useEffect } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";
import { useNavigation } from "@react-navigation/native";
import { postBook } from "../api";

const ListBook = () => {
   
    const { userContext } = useContext(UserContext);
    const [searchTerm,setSearchTerm] = useState('')
    const [books,setBooks]=useState([])
    const [selectedBook,setSelectedBook]=useState(bookTemplate)

    const [titleInput, setTitleInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [publishedDateInput,setPublishedDateInput]=useState('')
  const [descriptionInput, setDescriptionInput] = useState('');
  const [genreInput, setGenreInput] = useState('');
  const [isbnInput, setIsbnInput] = useState('');
  const [conditionInput, setConditionInput] = useState('');
  const [borrowLengthInput, setBorrowLengthInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [error,setError]=useState(null)
  const [successMessage,setSuccessMessage]=useState(false)

        const bookTemplate={
            "title": "",
            "author": "",
            "username": '',
            "published_date":'',
            "genre": "",
            "isbn": "",
            "description": "",
            "condition": "",
            "borrow_length": "",
            "book_img": "",
        }

    const handleSearch = () => {
        setBooks('')
         fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyADLCg6_v6EHGMFWxUuKBd6nCFB-b9d31Q`,
          ).then((res)=>res.json())
            .then((data)=>{
            setBooks(data.items || []);
            setSearchTerm('')
          }).catch((err)=>{
              console.error('Error fetching data:', err);
    })}

        const handleBookSelection= async (item)=>{
            try{
            setSelectedBook({
                ...selectedBook,
                title: `${item.volumeInfo.title}`,
            author: `${item.volumeInfo.authors}`,
            published_date:`${item.volumeInfo.publishedDate}`,
            genre: `${item.volumeInfo.categories}`,
            isbn: `${item.volumeInfo.industryIdentifiers[0].identifier}`,
        description: `${item.volumeInfo.description}`,
        condition: "",
            borrow_length: "",
            book_img:`${item.volumeInfo.imageLinks.thumbnail}`,
            })
            setAuthorInput(selectedBook.author)
            setPublishedDateInput(selectedBook.published_date)
            setTitleInput(selectedBook.title)
            setDescriptionInput(selectedBook.description)
            setGenreInput(selectedBook.genre)
            setIsbnInput(selectedBook.isbn)
            setImageInput(selectedBook.book_img)
        } catch(error){
            console.log(error,'Error in catch block')
        }
        }

        const uploadBook = {
            title:`${titleInput}`,
            author:`${authorInput}`,
            username: `${userContext.username}`,
            published_date:`${publishedDateInput}`,
            genre:`${genreInput}`,
            isbn: `${isbnInput}`,
            description:`${descriptionInput}`,
            condition:`${conditionInput}`,
            borrow_length:`${borrowLengthInput}`,
            book_img:`${imageInput}`
        
        }
        
        const handleSubmit = ()=>{
            postBook(uploadBook)
            .then((book)=>{
                setSelectedBook(bookTemplate)
                setTitleInput('')
                setAuthorInput('')
                setGenreInput('')
                setBorrowLengthInput('')
                setConditionInput('')
                setImageInput('')
                setIsbnInput('')
                setPublishedDateInput('')
                setDescriptionInput('')
                setError(null)
                setSuccessMessage(true)
            }).catch((err)=>{
                console.log(err,'Error uploading book');
                setError(err)
                setSuccessMessage(false)
            })
        }
      

    return (
   <View style={tailwind`flex-1 w-full items-center justify-center bg-gray-950`}>
      <View style={tailwind`flex-1 top-25 flex-col gap-4 items-center justify-center `}>
          <TextInput
            style={tailwind`border-2 border-white bg-zinc-500`}
            value={searchTerm}
            onChangeText={setSearchTerm}
            color="white"
            placeholder="Search for your book here..."
            placeholderTextColor="#FFF"
            />
           <Pressable>
              <Text onPress={handleSearch} style={tailwind`text-gray-50 font-bold`}>
                Search
              </Text>
            </Pressable>

            <FlatList
            style={tailwind` pt-2 pb-53`}
            horizontal={true}
        data={books}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
            <View>
            <Pressable onPress={()=>{handleBookSelection(item)}}>
                <Image  
                source={{uri:item.volumeInfo.imageLinks.thumbnail}} 
                style={tailwind `w-30 h-50 rounded-lg mx-4`}/> 
              <Text 
              style={tailwind`text-white top-5 w-30 font-bold mx-4`}>
              {item.volumeInfo.title}
              </Text>
                 
            </Pressable>
          </View>
        )}/>
      
      <ScrollView style={tailwind`top-2 w-90`} >
      <Text style={tailwind`text-1xl top-5 font-bold mb-6 text-gray-50`}>Title</Text>
       <TextInput 
            editable
            style = {tailwind`border-2 border-white bg-zinc-500 rounded-lg`}
            value={titleInput}
            onChangeText={setTitleInput}
            color="white"
            placeholder="title"
            placeholderTextColor="#FFF"
          />
          <Text style={tailwind`text-1xl top-5 font-bold mb-6 text-gray-50`}>Author</Text>
          <TextInput
            editable
            style = {tailwind`border-2 border-white bg-zinc-500 rounded-lg`}
           value={authorInput}
           onChangeText={setAuthorInput}
            color="white"
            placeholder="author"
            placeholderTextColor="#FFF"
          /><Text style={tailwind`text-1xl  top-5 font-bold mb-6 text-gray-50`}>Published Date:</Text>
          <TextInput
            editable
            style = {tailwind`border-2 border-white bg-zinc-500 rounded-lg`}
           value={publishedDateInput}
           onChangeText={setPublishedDateInput}
            color="white"
            placeholder="published date"
            placeholderTextColor="#FFF"
          />
            <Text style={tailwind`text-1xl top-5 font-bold mb-6 text-gray-50`}>Description:</Text>
          <TextInput
            editable
            style = {tailwind`border-2 border-white bg-zinc-500 rounded-lg`}
           value={descriptionInput}
           onChangeText={setDescriptionInput}
            color="white"
            placeholder="description"
            placeholderTextColor="#FFF"
          />
          <Text style={tailwind`text-1xl top-5 font-bold mb-6 text-gray-50`}>Genre:</Text>
          <TextInput
           style = {tailwind`border-2 border-white bg-zinc-500 rounded-lg`}
           value={genreInput}
           onChangeText={setGenreInput}
            color="white"
            placeholder="genre"
            placeholderTextColor="#FFF"
          />
          <Text style={tailwind`text-1xl  top-5 font-bold mb-6 text-gray-50`}>Isbn:</Text>
          <TextInput
            editable
            style = {tailwind`border-2 border-white bg-zinc-500 rounded-lg`}
           value={isbnInput}
           onChangeText={setIsbnInput}
            color="white"
            placeholder="isbn"
            placeholderTextColor="#FFF"
          />
          <Text style={tailwind`text-1xl top-5 font-bold mb-6 text-gray-50`}>Condition:</Text>
          <TextInput
            editable
            style = {tailwind`border-2 border-white bg-zinc-500 rounded-lg`}
           onChangeText={setConditionInput}
            color="white"
            placeholder="condition"
            placeholderTextColor="#FFF"
          />
          <Text style={tailwind`text-1xl top-5 font-bold mb-6 text-gray-50`}>Borrow Length:</Text>
          <TextInput
            editable
            style = {tailwind`border-2 border-white bg-zinc-500 rounded-lg`}
           value={borrowLengthInput}
           onChangeText={setBorrowLengthInput}
            color="white"
            placeholder="borrow length"
            placeholderTextColor="#FFF"
          />
           {/* <Text style={tailwind`text-1xl font-bold mb-6 text-gray-50`}>Image</Text>
           <TextInput
            editable
           style = {{borderWidth : 1.0, borderColor: '#FFF', backgroundColor: '#808080', }}
            value={imageInput}
            onChangeText={setImageInput}
            color="white"
            placeholder="image"
            placeholderTextColor="#FFF"
          />  */}
          </ScrollView>
          <Pressable>
              <Text 
              style={tailwind`text-white font-bold pb-10 pt-5`}
              onPress={handleSubmit}>
              Add book
              </Text>
            </Pressable>
            <View>
                   {error ? (
                     <Text style={tailwind`text-red-600 pb-7 `}>There was an error adding your book. Try again later</Text>
                   ) : (
                     <Text>...</Text>
                   )}
                   {successMessage ? (
                     <Text style={{ color: 'green' }}>Your book was added successfully</Text>
                   ) : (
                     <Text>...</Text>
                   )}
        </View>
          </View>
          </View>
  );
};

export default ListBook;
