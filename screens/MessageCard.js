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
      //setTrigger(messages)
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

    if (title) {
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

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -50}
      style={tailwind`mx-auto flex-1 w-full items-center justify-center bg-gray-900`}
    >
      <View style={tailwind`flex-1 top-10 flex-col gap-4 items-center justify-center `}>

        <FlatList
          style={{ height: 500 }}
          data={messages}
          renderItem={({ item }) => {
            return (
              <View style={item.from === conversationWith ? tailwind`m-2 bg-gray-700 rounded-lg p-3 opacity-80 px-4 text-right text-white self-start` : tailwind`m-2 bg-gray-700 rounded-lg p-3 opacity-80 px-4 text-left text-white self-end`}>
                <Text
                  style={

                    item.from === conversationWith
                      ? tailwind`text-right self-start text-blue-300`
                      : tailwind`text-left self-end text-blue-300`
                  }
                >
                  {item.from} | {dateFormatter(item.timestamp)}
                </Text>
                <Text
                  style={
                    item.from === conversationWith
                      ? tailwind`text-right text-white self-start`
                      : tailwind`text-left text-white self-end `
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
          color='white'
          placeholderTextColor="#FFF"
        />
        <Pressable disabled={messageValidator()} onPress={onSendMessage}>
          <Text style={tailwind`text-blue-300 font-bold pb-30`}>Send message!</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>

  );
};
