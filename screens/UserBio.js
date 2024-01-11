import { useEffect, useState } from "react";
import { FlatList, Text, View, Image } from "react-native";
import { getUsers } from "../api";
import tailwind from "twrnc";
export default UserBio = ({ userDetails }) => {
  console.log(userDetails.avatar_img);

  return (
    <View style={tailwind}>
      <Image
        style={{ width: 100, height: 170 }}
        source={{
          uri: userDetails.avatar_img
        }}
      />

      <Text style={tailwind`text-white`}>{userDetails.bio}</Text>
      <Text style={tailwind`text-white`}>{userDetails.location}</Text>
    </View>
  );
};
