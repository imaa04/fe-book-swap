import { StatusBar } from "expo-status-bar";
import { Text, View, FlatList } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import tailwind from "twrnc";
import { UserContext } from "../context/userContext";

import { getConversations } from "../api";
import { dateFormatter } from "../utils";
import { useFocusEffect } from "@react-navigation/native";

const Messages = ({ route, navigation, testState }) => {
  const [conversations, setConversations] = useState([]);
  const [focus, setFocus] = useState(false);
  const { userContext } = useContext(UserContext);



  // useFocusEffect(() => {
  //   console.log("focus")
  //   setFocus(true);
  // },[focus]);

  useEffect(() => {
    getConversations(userContext.username).then(({ data }) => {
      console.log(data.conversations);
      setConversations(data.conversations);
      setFocus(false)
    });
  }, []);

  console.log(testState);

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
                    conversationWith: item.with
                    
                  });
                }}
              >
                {item.with}:
              </Text>
              <Text>Last message: {dateFormatter(item.timestamp)}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.with}
      />
    </View>
  );
};

export default Messages;
