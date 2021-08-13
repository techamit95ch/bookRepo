import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from './actions/auth';
import { Spinner, Center, NativeBaseProvider } from 'native-base';
import ContentNav from './navigation/Content';
import LoginScreen from './screens/Auth/Login';
import SignInScreen from './screens/Auth/Signin';
import { LogBox } from 'react-native';
import { getAll } from './actions/books';

export default function AsyncApp() {
  let Stack;
  Stack = createStackNavigator();
  const [ready, setReady] = React.useState(false);
  const results = useSelector((state: any) => state.results);
  const [success, setSuccess] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    LogBox.ignoreLogs(['timer']);
    dispatch(isAuthenticated());
    dispatch(getAll());
    setTimeout(() => {
      setReady(true);
      
      // auth = results;
    }, 3000);
  }, [dispatch, results, success]);
  console.log(results);
  if (results?.authState === 0 || !ready) {
    // if (!ready) {
    return (
      <NativeBaseProvider>
        <Center flex={1}>
          <Spinner color="blue.500" size="lg" />
        </Center>
      </NativeBaseProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName={results.authState === 1 ? 'Content' : 'Auth'}
          // initialRouteName={'Content'}
        >
          <Stack.Screen
            name="Auth"
            component={LoginScreen}
            options={{
              headerTitle: 'Log In',
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: '#005EB8',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerTitle: 'Sign In',
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: '#005EB8',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
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
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
