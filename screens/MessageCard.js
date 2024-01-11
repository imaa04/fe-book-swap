import { getMessages } from "../api";
import { dateFormatter } from "../utils";
import { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../context/userContext";
import {
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as React from "react";
import tailwind from "twrnc";

export default MessageCard = ({ route, navigation }) => {
  const { userContext } = useContext(UserContext);
   const [messages, setMessages] = useState([]);
  const { conversationWith, title } = route.params;
  const [newMessage, setNewMessage] = useState("");

console.log(messages)


  const ws = new WebSocket(
    `wss://cluster-books-wss.onrender.com/${userContext.username}`
  );

  ws.onopen = () => {
    console.log("connection opened");
  };

  ws.onmessage = (e) => {
    const parsedMessage = JSON.parse(e.data);

    if (parsedMessage.between.includes(conversationWith)) {
      setMessages((currMessages) => {
        return [...currMessages, JSON.parse(e.data)];
      });
      setTrigger(messages)
    }
  };

  ws.onerror = (e) => {
    console.log(e.message);
  };

  ws.onclose = (e) => {
    console.log(e.code, e.reason);
  };

  const onSendMessage = () => {
    const formattedNewMessage = {
      between: [userContext.username, conversationWith].sort(),
      from: userContext.username,
      body: newMessage,
    };
    ws.send(JSON.stringify(formattedNewMessage));

    const messageToRender = {
      ...formattedNewMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((currMessages) => {
      return [...currMessages, messageToRender];
    });

    setNewMessage("");
  };

  const onChangeText = (e) => {
    setNewMessage(e);
  };

  useEffect(() => {
    navigation.setOptions({ title: conversationWith });

if(title){
  setNewMessage(`Hello, is your copy of ${title} available to borrow?`)
}

    getMessages(userContext.username, conversationWith).then(({ data }) => {
      setMessages(data.messages);
    });
  }, []);

  const messageValidator = () => {
    const arr = newMessage.split("");
    const isSpaces = arr.every((character) => character === " ");
    return isSpaces;
  };

  return (
 
      <View style={tailwind`flex gap-2`}>
        <FlatList
          style={{ height: 500 }}
          data={messages}
          renderItem={({ item }) => {
            return (
              <View style={tailwind`m-2`}>
                <Text
                  style={
                    item.from === conversationWith
                      ? tailwind`text-right `
                      : tailwind`text-left `
                  }
                >
                  {item.from} | {dateFormatter(item.timestamp)}
                </Text>
                <Text
                  style={
                    item.from === conversationWith
                      ? tailwind`text-right `
                      : tailwind`text-left `
                  }
                >
                  {item.body}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
        />

        <TextInput
          onChangeText={onChangeText}
          value={newMessage}
          placeholder="Type a new message..."
        />
        <Pressable disabled={messageValidator()} onPress={onSendMessage}>
          <Text>Send message!</Text>
        </Pressable>
      </View>
  
  );
};
