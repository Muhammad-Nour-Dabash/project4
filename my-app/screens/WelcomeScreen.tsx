import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  SafeAreaView,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import nft08 from "../assets/images/nft08.jpg";
import nft06 from "../assets/images/nft06.jpg";
import nft04 from "../assets/images/nft04.jpg";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "@/components/PrimaryButton";

const Welcome = () => {
  const navigation = useNavigation();
  const duration = 1000;
  const delay = duration + 300;

  const fadeImagesAnimation = useRef(new Animated.Value(0)).current;
  const moveImagesAnimation = useRef(
    new Animated.ValueXY({ x: 100, y: 100 })
  ).current;
  const fadeTextAnimation = useRef(new Animated.Value(0)).current;
  const moveButtonAnimation = useRef(new Animated.Value(1)).current;

  const pressHandler = () => {
    navigation.navigate("home");
  };

  const imagesAnimationHandler = () => {
    Animated.sequence([
      Animated.timing(fadeImagesAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.spring(moveImagesAnimation, {
        toValue: { x: 0, y: 0 },
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const textAnimationHandler = () => {
    Animated.timing(fadeTextAnimation, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };

  const buttonAnimationHandler = () => {
    Animated.spring(moveButtonAnimation, {
      toValue: 0,
      friction: 4,
      delay,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    imagesAnimationHandler();
    textAnimationHandler();
    buttonAnimationHandler();
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeImagesAnimation,
            transform: moveImagesAnimation.getTranslateTransform(),
          },
        ]}
      >
        {[nft06, nft08, nft04].map((img, index) => (
          <View
            key={index}
            style={[
              styles.imageCard,
              index === 1 && { top: SIZES.medium + 17 },
            ]}
          >
            <Image style={styles.image} source={img} resizeMode="cover" />
          </View>
        ))}
      </Animated.View>

      <Animated.View
        style={[styles.textContainer, { opacity: fadeTextAnimation }]}
      >
        <Text style={styles.mainText}>Find, Collect and Sell Amazing NFTs</Text>
        <Text style={styles.subText}>
          Explore the top collection of NFTs and buy and sell your NFTs as well
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [
              {
                translateY: moveButtonAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
            ],
          },
        ]}
      >
        <PrimaryButton
          title="Get Started"
          onPress={pressHandler}
          style={styles.button}
          textStyle={styles.textButton}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.small + 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  imageContainer: {
    top: -SIZES.medium,
    flexDirection: "row",
    gap: SIZES.small,
  },
  imageCard: {
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    backgroundColor: COLORS.cardBg,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: SIZES.medium,
  },
  textContainer: {
    margin: SIZES.small,
    padding: SIZES.small,
    marginVertical: SIZES.xLarge + 6,
  },
  mainText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge + 5,
    textAlign: "center",
    color: COLORS.white,
  },
  subText: {
    fontFamily: FONTS.light,
    textAlign: "center",
    marginTop: SIZES.large,
    color: COLORS.gray,
    lineHeight: 22,
  },
  buttonContainer: {
    position: "absolute",
    bottom: SIZES.xLarge + 10,
    marginVertical: SIZES.xLarge,
  },
  button: {
    backgroundColor: COLORS.second,
    padding: SIZES.small + 4,
    width: 240,
    alignItems: "center",
    borderRadius: SIZES.medium,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  textButton: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
  },
});
