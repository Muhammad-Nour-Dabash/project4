import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Text } from "react-native-gesture-handler";

export default function CoreComponents() {
  const layoutHandler = (e: any) => {
    console.log(e.nativeEvent.layout);
  };
  return (
    <View onLayout={layoutHandler} /*pointerEvents="none"*/>
      <ScrollView
        // horizontal={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        onScroll={(e) => {
          console.log(e.nativeEvent.contentOffset);
        }}
        keyboardDismissMode="none"
        contentContainerStyle={{
          // flex: 1,
          padding: 32,
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Text
          allowFontScaling={false}
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.title}
        >
          Hello World 👋 Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Perspiciatis soluta quod reiciendis quaerat in recusandae!
          Praesentium illo inventore quae possimus hic natus fuga quod commodi
          architecto, nesciunt doloribus recusandae explicabo.
        </Text>
        <Button title="Press me" onPress={() => console.log("pressed")} />
        <Image
          source={require("@/assets/images/icon.png")}
          style={{ width: 100, height: 100 }}
        />
        <ActivityIndicator size={56} />
        <View style={{ backgroundColor: "black", height: 250, width: "100%" }}>
          <Image
            accessibilityLabel="Image"
            // onError={}
            // onLoad={}
            // defaultSource={require("@/assets/images/icon.png")} // Work on production mode only
            resizeMode="cover"
            source={{ uri: "https://picsum.photos/200" }}
            style={{ width: "100%", height: 250 }}
            blurRadius={1}
          />
        </View>
        <TextInput
          placeholder="Placeholder"
          style={{ backgroundColor: "#ededed", width: "100%" }}
          keyboardType="default"
          // placeholderTextColor={"black"}
          defaultValue=""
          onChange={(e) => console.log(e.nativeEvent.text)}
          maxLength={10}
          multiline
          numberOfLines={5}
          // onBlur={(e) => {}}
          // onFocus={(e) => {}}
          secureTextEntry={false}
          autoCapitalize="sentences"
          autoCorrect={true}
          editable={true}
          // onSubmitEditing={(e) => {}}
        ></TextInput>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
});
