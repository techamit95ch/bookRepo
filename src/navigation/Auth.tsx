import React, { useState, useEffect } from "react";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Auth/Login";
import SignInScreen from "../screens/Auth/Signin";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";

export default function Auth({ navigation }) {
  const Stack = createStackNavigator();

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch, user]);
  // console.log(user);
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName={"Login"}>
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: "Log In",
              headerStyle: {
                backgroundColor: "white",
              },
              headerTintColor: "#005EB8",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerLeft: () => (<></>)

            }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerTitle: "Sign In",
              headerStyle: {
                backgroundColor: "white",
              },
              headerTintColor: "#005EB8",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
