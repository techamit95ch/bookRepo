import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { isAuthenticated } from './actions/auth';
import { Spinner, Center, NativeBaseProvider } from 'native-base';
// import AuthNav from "./navigation/Auth";
// import ContentNav from "./navigation/Content";

export default function AsyncApp() {
  const [ready, setReady] = useState(false);
  let Stack;
  Stack = createStackNavigator();
  useEffect(() => {
    setTimeout(() => setReady(true), 3000);
  }, [ready]);
  let auth;
  isAuthenticated().then((res) => {
    console.log(res);
    auth = res;
  }).catch((e) => console.error(e));
  // console.log(auth);

  // if (!ready) {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Spinner color="blue.500" size="lg" />
      </Center>
    </NativeBaseProvider>
  );
  // }

  /* return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          // initialRouteName={user.isAuthenticated ? "Content" : "Auth"}
          // initialRouteName={"Content"}
        >
          <Stack.Screen
            name="Auth"
            component={AuthNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Content"
            component={ContentNav}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  ); */
}
