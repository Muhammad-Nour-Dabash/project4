import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS, FONTS } from "../constants";
import { Feather, AntDesign } from "@expo/vector-icons";

type AddNFTModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (nft: {
    id: string;
    name: string;
    image: string | null;
    creator: string;
    views: string;
    comments: number;
    price: number;
    date: string;
    tokenId: number;
    tokenSt: string;
    blockchain: string;
    topBid: string;
    address: string;
    avatars: any[];
  }) => void;
};

const AddNFTModal: React.FC<AddNFTModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async (fromCamera: boolean) => {
    const result = await (fromCamera
      ? ImagePicker.launchCameraAsync({ quality: 0.5, base64: false })
      : ImagePicker.launchImageLibraryAsync({ quality: 0.5, base64: false }));

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    onAdd({
      id: Date.now().toString(),
      name,
      image,
      creator: "New Creator",
      views: "0",
      comments: 0,
      price: 0,
      date: new Date().toISOString().split("T")[0],
      tokenId: 0,
      tokenSt: "ERC-721",
      blockchain: "Ethereum",
      topBid: "0",
      address: "0x000...000",
      avatars: [],
    });

    setName("");
    setImage(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add NFT</Text>

          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.iconPlaceholder}>
              <Feather name="image" size={48} color={COLORS.gray} />
            </View>
          )}

          <View style={styles.buttonsRow}>
            <Pressable onPress={() => pickImage(false)} style={styles.button}>
              <Text style={styles.buttonText}>Gallery</Text>
            </Pressable>

            <Pressable onPress={() => pickImage(true)} style={styles.button}>
              <Text style={styles.buttonText}>Camera</Text>
            </Pressable>

            <Pressable
              onPress={() => setImage(null)}
              style={[styles.button, { backgroundColor: COLORS.gray }]}
            >
              <AntDesign name="delete" size={20} color={COLORS.white} />
            </Pressable>
          </View>
          <View style={{ height: 50 }}></View>
          <View style={styles.buttonsRow}>
            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </Pressable>
            <Pressable
              onPress={onClose}
              style={[styles.button, { backgroundColor: COLORS.gray }]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddNFTModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: COLORS.cardBg,
    padding: 20,
    borderRadius: 15,
    width: "90%",
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 10,
    fontFamily: FONTS.medium,
    fontSize: 14,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconPlaceholder: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: COLORS.second,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },
});
