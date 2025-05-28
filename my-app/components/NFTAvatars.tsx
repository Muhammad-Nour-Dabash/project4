import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import React from "react";

type Avatar = {
  id: string | number;
  image: ImageSourcePropType;
};

type NFTAvatarsProps = {
  avatars: Avatar[];
};

const NFTAvatars = ({ avatars }: NFTAvatarsProps) => {
  return (
    <View style={styles.container}>
      {avatars.map((avatar) => (
        <Image
          key={avatar.id}
          source={avatar.image}
          resizeMode="contain"
          style={styles.avatar}
        />
      ))}
    </View>
  );
};

export default NFTAvatars;

const styles = StyleSheet.create({
  container: { flexDirection: "row", paddingHorizontal: 5 },
  avatar: {
    width: 40,
    height: 40,
    marginLeft: -5,
    borderRadius: 40,
  },
});
