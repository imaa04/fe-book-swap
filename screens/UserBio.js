import { useEffect, useState } from "react";
import { FlatList, Text, View, Image } from "react-native";
import { getUsers } from "../api";

export default UserBio = ({ userDetails }) => {
  console.log(userDetails.avatar_img);

  return (
    <View>
      <Image
        style={{ width: 100, height: 170 }}
        source={{
          uri: userDetails.avatar_img
        }}
      />

      <Text>{userDetails.bio}</Text>
      <Text>{userDetails.location}</Text>
    </View>
  );
};
