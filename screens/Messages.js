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
      setConversations(data.conversations);
      setFocus(false)
    });
  }, []);


  return (
    <View style={tailwind`mx-auto flex-1 w-full  bg-gray-900 pt-20 justify-center items-center`}>
      <Text style={tailwind `text-white `}>Your Messages</Text>
      <FlatList
        
        data={conversations}
        renderItem={({ item }) => {
          return (
            <View style={tailwind `m-2 bg-gray-700 rounded-lg p-3 opacity-80 px-4 text-right text-white self-start w-103`}>
              <Text
              style={tailwind`text-blue-300`}
                onPress={() => {
                  navigation.navigate("MessageCard", {
                    conversationWith: item.with
                    
                  });
                }}
              >
                {item.with}:
              </Text>
              <Text style={tailwind`text-white`}>Last message: {dateFormatter(item.timestamp)}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.with}
      />
    </View>
  );
};

export default Messages;
