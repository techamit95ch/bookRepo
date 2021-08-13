import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Header, Text, Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
const HeaderBar = ({ navigation, back, add, BackButton }) => {
  return (
    <>
      {/* <Header
        statusBarProps={{
          barStyle: "dark-content",
          backgroundColor: "white",
          animated: true,
          showHideTransition: "fade",
        }}
        leftComponent={
          back === "back" ? (
            <BackButton />
          ) : (
            <Button
              type="clear"
              // titleStyle={{ color: "#005EB8" }}
              icon={{
                name: "more-vert",
                size: 24,
                color: "#005EB8"
              }}
              onPress={() => navigation.toggleDrawer()}
            />
          )
        }
        centerComponent={{
          text: "Books App",
          style: {
            color: "#005EB8",
            fontSize: 20,
            marginLeft: 10,
            width: 100,
            fontWeight: "bold",
            marginTop: 4,
          },
        }}
        rightComponent={
          add === "Add Book" ? (
            <Button
              title="Add Book"
              type="clear"
              titleStyle={{ color: "#005EB8" }}
              onPress={() => navigation.navigate("Add")}
            />
          ) : (
            ``
          )
        }
        rightContainerStyle={{ flex: 2 }}
        containerStyle={{
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 0,
          elevation: 4,
        }}
      /> */}
    </>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({});
