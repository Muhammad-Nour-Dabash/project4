import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Animated,
  StatusBar,
  FlatList,
} from "react-native";
import { COLORS, DATA, FONTS, SIZES } from "../constants";
import NFTCard from "../components/NFTCard";
import HomeHeader from "../components/HomeHeader";
import { NFTDataType } from "@/types/NFTDataType";

const Home = () => {
  const [nftsData, setNftsData] = useState<any[]>(DATA);
  const moveSearchAnimation = useRef(new Animated.Value(0)).current;

  /**
   * @desc search for nfts data about name
   * @param value : input value
   */
  const searchHandler = (value: string) => {
    if (value) {
      const filteredData = DATA.filter((nft: any) =>
        nft.name.toLowerCase().includes(value.toLowerCase())
      );
      setNftsData(filteredData);
    } else {
      setNftsData(DATA);
    }
  };

  const NotFoundNFT = () => {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Oops...!</Text>
        <Text style={styles.notFoundText}>Not found the NFT</Text>
      </View>
    );
  };

  const searchAnimationHandler = () => {
    Animated.spring(moveSearchAnimation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    searchAnimationHandler();
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} touchSoundDisabled>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              top: -100,
              transform: [
                {
                  translateY: moveSearchAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                },
              ],
            }}
          >
            <HomeHeader searchHandler={searchHandler} />
          </Animated.View>

          {!nftsData.length ? (
            <NotFoundNFT />
          ) : (
            <FlatList
              data={nftsData}
              renderItem={({ item }: { item: NFTDataType }) => (
                <NFTCard NFTData={item} />
              )}
              keyExtractor={(item: any) => item.id}
              contentContainerStyle={{ paddingBottom: 20 }} // optional styling
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: (StatusBar.currentHeight || 0) + 10,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.xLarge,
  },
  notFoundText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge,
  },
});
