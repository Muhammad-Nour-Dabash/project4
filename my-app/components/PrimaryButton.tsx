import React from "react";
import { Pressable, Text, StyleProp, ViewStyle, TextStyle } from "react-native";

type BaseProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

type TextOnly = BaseProps & {
  title: string;
  icon?: never;
};

type IconOnly = BaseProps & {
  title?: never;
  icon: any;
};

type PrimaryButtonProps = TextOnly | IconOnly;

const PrimaryButton = ({
  title,
  icon,
  onPress,
  style,
  textStyle,
}: PrimaryButtonProps) => {
  return (
    <Pressable style={style} onPress={onPress}>
      {title ? <Text style={textStyle}>{title}</Text> : icon}
    </Pressable>
  );
};

export default PrimaryButton;
