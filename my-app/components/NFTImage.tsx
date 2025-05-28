import React from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { COLORS } from "../constants";
import PrimaryButton from "./PrimaryButton";

type NFTImageProps = {
  image?: ImageSourcePropType | string | null;
  imageStyles?: StyleProp<ImageStyle>;
  love?: boolean;
  arrow?: boolean;
  pressHandler?: () => void;
};

const NFTImage = ({
  image,
  imageStyles,
  love,
  arrow,
  pressHandler,
}: NFTImageProps) => {
  const renderContent = () => {
    if (!image) {
      return (
        <View style={[styles.placeholder, imageStyles]}>
          <Feather name="image" size={48} color={COLORS.gray} />
        </View>
      );
    }

    return (
      <Image
        source={typeof image === "string" ? { uri: image } : image}
        style={imageStyles}
        resizeMode="cover"
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      {love && (
        <PrimaryButton
          style={styles.buttonHeart}
          icon={<AntDesign name="heart" size={20} color={COLORS.second} />}
          onPress={() => {}}
        />
      )}
      {arrow && (
        <PrimaryButton
          style={styles.buttonArrow}
          icon={<Feather name="arrow-left" size={20} color={COLORS.second} />}
          onPress={() => {
            pressHandler?.();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  placeholder: {
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonHeart: {
    position: "absolute",
    top: (StatusBar.currentHeight || 0) + 10,
    right: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 40,
  },
  buttonArrow: {
    position: "absolute",
    top: (StatusBar.currentHeight || 0) + 10,
    left: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 40,
  },
});

export default NFTImage;
