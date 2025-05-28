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
  Pressable,
} from "react-native";
import { COLORS, DATA, FONTS, SIZES } from "../constants";
import NFTCard from "../components/NFTCard";
import HomeHeader from "../components/HomeHeader";
import { NFTDataType } from "@/types/NFTDataType";
import { AntDesign } from "@expo/vector-icons";
import AddNFTModal from "@/components/AddNFTModal";

const Home = () => {
  const [nftsData, setNftsData] = useState<any[]>(DATA);
  const [showModal, setShowModal] = useState(false);

  const moveSearchAnimation = useRef(new Animated.Value(0)).current;

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

  const NotFoundNFT = () => (
    <View style={styles.notFoundContainer}>
      <Text style={styles.notFoundText}>Oops...!</Text>
      <Text style={styles.notFoundText}>Not found the NFT</Text>
    </View>
  );

  useEffect(() => {
    Animated.spring(moveSearchAnimation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
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
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
            />
          )}

          {/* Floating Action Button */}
          <Pressable style={styles.fab} onPress={() => setShowModal(true)}>
            <AntDesign name="pluscircle" size={60} color={COLORS.white} />
          </Pressable>

          <AddNFTModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            onAdd={(newItem) => setNftsData([newItem, ...nftsData])}
          />
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
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    padding: 20,
    width: "85%",
    borderRadius: 15,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    fontFamily: FONTS.medium,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: COLORS.second,
    padding: 10,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
  },
  modalButtonText: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 16,
  },
});
