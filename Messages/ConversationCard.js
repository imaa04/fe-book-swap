import { useEffect, useState } from "react";
import { Text, View, FlatList, Pressable, TextInput, SafeAreaView, ScrollView, } from "react-native";
import { getMessages } from "./api";
import MessageInput from "./MessageInput";
import * as React from "react";
import { dateFormatter } from "./utils";

export default ConversationCard = ({ route, navigation }) => {
  const user = "Sarah Blue";
  const [messages, setMessages] = useState([]);
  const { conversationWith } = route.params;
  const [newMessage, setNewMessage] = useState("");

  const ws = new WebSocket("ws://localhost:3000/Sarah Blue");

  ws.onopen = () => {
    console.log("connection opened");
 
  };

  ws.onmessage = (e) => {
   

    const parsedMessage = JSON.parse(e.data);

    console.log(parsedMessage.between)

    if (parsedMessage.between.includes(conversationWith)){
      setMessages((currMessages) => {
        return [...currMessages, JSON.parse(e.data)];
      })}

  };

 



  ws.onerror = (e) => {
    // an error occurred
    console.log(e.message);
  };

  ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
  };



  const onSendMessage = () => {
    const formattedNewMessage = {
      between: [user, conversationWith].sort(),
      from: user,
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
    getMessages(user, conversationWith).then(({ data }) => {
      setMessages(data.messages);
    });
  }, []);

  return (
    <View>
      <Text>this is the conversation card with {conversationWith} </Text>

      <FlatList 
      style={{ height: 500 }}
        data={messages}
        renderItem={({ item }) => {
        
          return (
            <View>
              <Text>{item.from}</Text>
              <Text>{item.body}</Text>
              <Text>{dateFormatter(item.timestamp)}</Text>
            </View>
          );
        }}
      />

      {/* <FlatList
            data={messages}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.from}</Text>
                  <Text>{item.body}</Text>
                  <Text>{item.timestamp}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item._id}
          /> */}

      <TextInput
        onChangeText={onChangeText}
        value={newMessage}
        placeholder="Type a new message..."
        keyboardType="text"
      />
      <Pressable onPress={onSendMessage}>
        <Text>Send message!</Text>
      </Pressable>
    </View>
  );
};
