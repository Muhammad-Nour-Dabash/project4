import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Button,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function OtherComponents() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const animatedValue3 = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const positionValue = useRef(new Animated.ValueXY({ x: -100, y: 0 })).current;
  const spinAnimated = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animatedValue2, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
      delay: 1000,
    }).start();
  }, [animatedValue2]);
  const useStyles = () => {
    const { height, width, scale, fontScale } = useWindowDimensions();

    return StyleSheet.create({
      container: {
        flexDirection: "row",
        flex: 1,
      },
      left: {
        height: "100%",
        backgroundColor: "pink",
        width: width > 600 ? 300 : 100,
      },
      right: {
        height: "100%",
        backgroundColor: "skyblue",
        flex: 1,
      },
    });
  };
  const styles = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={"dark-content"}
          hidden={false}
        />
        <View style={styles.container}>
          <View style={styles.left} />
          <View style={styles.right}>
            <Button
              title="open mail"
              onPress={() =>
                Linking.openURL("mailto: support@expo.io").catch((err) =>
                  console.log(err)
                )
              }
            />
            <Button
              title="open phone"
              onPress={() => Linking.openURL("tel:+123456789")}
            />
            <Button
              title="open sms"
              onPress={() => Linking.openURL("sms: +123456789")}
            />
            <Button
              title="open URL"
              onPress={() => Linking.openURL("https://expo.dev/")}
            />

            <Modal
              visible={modalVisible}
              animationType="slide"
              onRequestClose={() => {
                setModalVisible(false);
              }}
              transparent={true}
              onShow={() => console.log("show modal")}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    margin: 20,
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 35,
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                  }}
                >
                  <Text>Modal</Text>
                  <Pressable onPress={() => setModalVisible(false)}>
                    <Text>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable onPress={() => setModalVisible(true)}>
              <Text>Show Modal</Text>
            </Pressable>
          </View>

          {/* <ScrollView contentContainerStyle={{ gap: 16, padding: 32 }}>
        <ActivityIndicator animating={true} size={"small"} color={"red"} />
        <TouchableOpacity
          onPress={() => {
            Animated.decay(animatedValue, {
              velocity: 0.5,
              deceleration: 0.997,
              useNativeDriver: true,
            }).start();
          }}
          style={{ backgroundColor: "red" }}
        >
          <Text>Start Animation</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            height: 100,
            width: 100,
            backgroundColor: "red",
            transform: [{ translateX: animatedValue }],
          }}
        />
        <Animated.View
          style={{
            opacity: animatedValue2,
            height: 100,
            width: 100,
            backgroundColor: "red",
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Animated.spring(animatedValue3, {
              toValue: 100,
              friction: 2,
              tension: 80,
              useNativeDriver: true,
            }).start();
          }}
          style={{ backgroundColor: "red" }}
        >
          <Text>Start Animation 3</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            transform: [{ translateY: animatedValue3 }],
            height: 100,
            width: 100,
            backgroundColor: "red",
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Animated.sequence([
              // Or use parallel, or stagger for adding time before each step
              Animated.timing(opacityValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.timing(positionValue, {
                toValue: { x: 0, y: 0 },
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.timing(opacityValue, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
              }),
            ]).start();
          }}
          style={{ backgroundColor: "red" }}
        >
          <Text>Start Animation Sequence</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            opacity: opacityValue,
            transform: positionValue.getTranslateTransform(),
            height: 100,
            width: 100,
            backgroundColor: "blue",
          }}
        />

        <TouchableOpacity
          onPress={() => {
            Animated.loop(
              Animated.sequence([
                Animated.timing(spinAnimated, {
                  toValue: 1,
                  duration: 1000,
                  useNativeDriver: true,
                }),
                Animated.timing(spinAnimated, {
                  toValue: 0,
                  duration: 1000,
                  useNativeDriver: true,
                }),
              ])
            ).start();
          }}
          style={{ backgroundColor: "red" }}
        >
          <Text>Start Animation Loop</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            transform: [
              {
                rotate: spinAnimated.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
            height: 100,
            width: 100,
            backgroundColor: "green",
          }}
        />
      </ScrollView> */}
        </View>
      </SafeAreaView>
    </>
  );
}
