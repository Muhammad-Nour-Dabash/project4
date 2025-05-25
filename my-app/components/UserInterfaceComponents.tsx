import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Button,
  DrawerLayoutAndroid,
  FlatList,
  Image,
  PermissionsAndroid,
  Pressable,
  RefreshControl,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Switch,
  SwitchComponent,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { Text } from "react-native-gesture-handler";

export default function UserInterfaceComponents() {
  const layoutHandler = (e: any) => {
    console.log(e.nativeEvent.layout);
  };

  useEffect(() => {
    const exitHandler = () => {
      Alert.alert("Exit App", "are you sure you want to exit app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      exitHandler
    );

    return () => backHandler.remove();
  }, []);
  const [isOk, setIsOk] = useState(false);
  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"],
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    },
    {
      title: "Drinks",
      data: ["Water", "Coke", "Beer"],
    },
    {
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"],
    },
  ];
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<"left" | "right">(
    "left"
  );

  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      renderNavigationView={() => (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            title="Close"
            onPress={() => drawer.current?.closeDrawer()}
          ></Button>
        </View>
      )}
      drawerPosition={drawerPosition}
      ref={drawer}
      keyboardDismissMode="on-drag"
      drawerLockMode="unlocked"
    >
      <View>
        <Text>Drawer Layout</Text>
      </View>
      <Button
        title="Open Drawer"
        onPress={() => drawer.current?.openDrawer()}
      />
      <Button
        title="Set Drawer Left"
        onPress={() => setDrawerPosition("left")}
      />
      <Button
        title="Set Drawer Right"
        onPress={() => setDrawerPosition("right")}
      />
      <Button
        title="Request Camera Permission"
        onPress={() => {
          // if(PermissionsAndroid)
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
            //    {
            //   // title: "Camera Permission",
            //   // message: "App needs access to your camera",
            //   // buttonNeutral: "Ask Me Later",
            //   // buttonNegative: "Cancel",
            //   // buttonPositive: "OK",
            // }
          ).then((result) => {
            console.log(result);
          });
        }}
      />
      <Button
        title="Open Toast"
        onPress={() => {
          ToastAndroid.show("Hello", ToastAndroid.CENTER);
        }}
      />
    </DrawerLayoutAndroid>
  );
  // return (
  //   <View onLayout={layoutHandler} /*pointerEvents="none"*/>
  //     {/* <SectionList
  //       sections={DATA}
  //       keyExtractor={(item, index) => item + index}
  //       renderItem={({ item }) => (
  //         <View style={styles.item}>
  //           <Text style={styles.title}>{item}</Text>
  //         </View>
  //       )}
  //       renderSectionHeader={({ section: { title } }) => (
  //         <Text style={styles.header}>{title}</Text>
  //       )}
  //     /> */}
  //     {/* <FlatList
  //       data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
  //       renderItem={({ item }) => (
  //         <View>
  //           <Text>{item}</Text>
  //         </View>
  //       )}
  //       keyExtractor={(item) => item.toString()}
  //       ListHeaderComponent={() => (
  //         <View>
  //           <Text>Header</Text>
  //         </View>
  //       )}
  //       ListFooterComponent={() => (
  //         <View>
  //           <Text>Footer</Text>
  //         </View>
  //       )}
  //       ListEmptyComponent={() => (
  //         <View>
  //           <Text>Empty</Text>
  //         </View>
  //       )}
  //       ItemSeparatorComponent={() => (
  //         <View>
  //           <Text>------------------------</Text>
  //         </View>
  //       )}
  //       onEndReached={() => {
  //         console.log("onEndReached");
  //       }}
  //       refreshControl={
  //         <RefreshControl
  //           refreshing={false}
  //           onRefresh={() => {
  //             console.log("onRefresh");
  //           }}
  //           progressBackgroundColor={"#ededed"}
  //         />
  //       }
  //     ></FlatList> */}
  //     {/* <ScrollView
  //       // horizontal={true}
  //       scrollEnabled={true}
  //       showsVerticalScrollIndicator={true}
  //       showsHorizontalScrollIndicator={true}
  //       onScroll={(e) => {
  //         console.log(e.nativeEvent.contentOffset);
  //       }}
  //       keyboardDismissMode="none"
  //       contentContainerStyle={{
  //         // flex: 1,
  //         padding: 32,
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //         gap: 16,
  //       }}
  //     >
  //       <Pressable
  //         android_ripple={{ color: "gray", radius: 100 }}
  //         android_disableSound={false}
  //         onPress={() => {}}
  //         style={({ pressed }) => ({
  //           padding: 10,
  //           backgroundColor: "#f0f0f0",
  //           borderRadius: 10,
  //         })}
  //       >
  //         <Text>Click Me!</Text>
  //       </Pressable>
  //       <Switch
  //         onValueChange={() => {
  //           setIsOk(!isOk);
  //         }}
  //         value={isOk}
  //         trackColor={{ false: "#767577", true: "#81b0ff" }}
  //         thumbColor={isOk ? "#f5dd4d" : "#f4f3f4"}
  //         ios_backgroundColor={"#3e3e3e"}
  //       />

  //     </ScrollView> */}
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});
