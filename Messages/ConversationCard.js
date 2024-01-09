import { useEffect, useState, useRef } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { getMessages } from "./api";
import MessageInput from "./MessageInput";
import * as React from "react";


export default ConversationCard = ({route, navigation}) => {


  const socket = useRef(null);

  useEffect(() => {
    
     socket.current = new WebSocket(
      "ws://localhost:3000/Sarah Blue"
    );
    socket.current.onopen = () => {console.log("connection opened")}
    socket.current.onclose = () => {console.log("connection closed")}
 
    const wsCurrent = socket.current;

    return () => {
      wsCurrent.close();
    };


  }, []);


  const user = "Sarah Blue"

  const [messages, setMessages] = useState([])
  const {conversationWith} = route.params

    useEffect(() => {
      getMessages(user, conversationWith ).then(({ data }) => {
        setMessages(data.messages);
      });
    }, []);


  const testMessage = {
    between: ["Sarah Blue", "David Black"],
    from: "Sarah Blue",
    body: "hardcoded message from front end",
  };


  return (
    <View>
      <Text>this is the conversation card with {conversationWith} </Text>
      <FlatList
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
        keyExtractor={(message) => message._id}
      />
      <MessageInput
        setMessages={setMessages}
        conversationWith={conversationWith}
      />
      <Pressable
      >
        <Text>Send Test Message</Text>
      </Pressable>
    </View>
  );
};
