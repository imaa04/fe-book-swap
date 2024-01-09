import { Text, View, FlatList } from "react-native";
const user = "Sarah Blue"
import { useEffect, useState } from "react";
import { getConversations } from "./api";
import ConversationCard from "./ConversationCard";

export default ConversationList = ({navigation}) => {

    const [conversations, setConversations] = useState([])

    useEffect(() => {
        getConversations(user).then(({data})=>{
        setConversations(data.conversations)
    })}, [])



  return (
    <View>
      
          <FlatList
            data={conversations}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text key={item.with} onPress={()=>{ 
                    navigation.navigate("ConversationCard", {conversationWith: item.with});
                  }

                  }>{item.with}:</Text>
                  <Text>Last message: {item.timestamp}</Text>
                </View>
              );
            }}
            keyExtractor={(message) => message._id}
          />
    </View>
  );
};
