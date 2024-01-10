import { StatusBar } from "expo-status-bar";
import { Text, View, FlatList } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";

import { getConversations } from "../api";
import { dateFormatter } from "../utils";

const Messages = ({ route, navigation }) => {
  const [conversations, setConversations] = useState([]);
  const { userContext } = useContext(UserContext);

  useEffect(() => {
    getConversations(userContext.username).then(({ data }) => {
      setConversations(data.conversations);
    });
  }, []);

  return (
    <View>
      <Text>Your Messages</Text>
      <FlatList
        data={conversations}
        renderItem={({ item }) => {
          return (
            <View>
              <Text
                onPress={() => {
                  navigation.navigate("MessageCard", {
                    conversationWith: item.with,
                  });
                }}
              >
                {item.with}:
              </Text>
              <Text>Last message: {dateFormatter(item.timestamp)}</Text>
            </View>
          );
        }}
        keyExtractor={(message) => message._id}
      />
    </View>
  );
};

export default Messages;
