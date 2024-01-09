import { useEffect, useState, useRef } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { getMessages } from "./api";
import MessageInput from "./MessageInput";
import * as React from "react";

export default ConversationCard = ({ route, navigation }) => {
  const user = "Sarah Blue";
  const [webSocketReady, setWebSocketReady] = useState(false);

  const [webSocket, setWebSocket] = useState(
    new WebSocket(`ws://localhost:3000/${user}`)
  );

  useEffect(() => {
    webSocket.onopen = (event) => {
      console.log("connected to WSS");
      setWebSocketReady(true);
    };

    webSocket.onclose = function (event) {
      console.log("disconnected");
      setWebSocketReady(false);
      setTimeout(() => {
        setWebSocket(new WebSocket("ws://localhost:3000"));
      }, 1000);
    };

    webSocket.onerror = function (err) {
      console.log("Socket encountered error: ", err.message, "Closing socket");
      setWebSocketReady(false);
      webSocket.close();
    };

    // request to api

    return () => {
      webSocket.close();
    };
  }, [webSocket]);

  const [messages, setMessages] = useState([]);
  const { conversationWith } = route.params;

  useEffect(() => {
    getMessages(user, conversationWith).then(({ data }) => {
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
      <Pressable>
        <Text>Send Test Message</Text>
      </Pressable>
    </View>
  );
};
