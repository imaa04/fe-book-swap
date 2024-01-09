// import { useState } from "react";
// import { Text, TextInput, SafeAreaView, Pressable, View } from "react-native";


// export default MessageInput = ({ setMessages, conversationWith }) => {
//      const user = "Sarah Blue"

//   const [newMessage, setNewMessage] = useState("");

//   const onMessageSubmit = () => {
    
//     const formattedNewMessage = {
//         "between": [user, conversationWith].sort(),
//         "from": user,
//         "body": newMessage
//     }

 
// console.log(typeof JSON.stringify(formattedNewMessage));


// const messageToRender = {...formattedNewMessage, timestamp: new Date().toISOString() }

//     setMessages((currMessages)=>{
//        return [...currMessages, messageToRender]
//     })



//     setNewMessage("");
//   };

//   const onChangeText = (e) => {
//     setNewMessage(e)
//   };

//   console.log(newMessage)

//   return (
  
//       <View>
//         <Text>Helloooo!!</Text>
//           <TextInput
//             onChangeText={onChangeText}
//             value={newMessage}
//             placeholder="Type a new message..."
//             keyboardType="text"
//           />
//           <Pressable onPress={onMessageSubmit}>
//             <Text>I'm pressable!</Text>
//           </Pressable>
//       </View>
//   );
// };
