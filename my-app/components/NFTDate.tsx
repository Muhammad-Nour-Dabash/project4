import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";

type NFTDateProps = {
  date: string;
};

const NFTDate = ({ date }: NFTDateProps) => {
  return (
    <View>
      <Text style={styles.textDate}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textDate: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
});

export default NFTDate;
