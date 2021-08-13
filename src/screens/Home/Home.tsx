import React, { useCallback, useEffect, useState } from "react";
import {
  Spinner,
  HStack,
  Heading,
  Center,
  NativeBaseProvider,
} from "native-base";
export default function HomeScreen({ navigation }) {
  const delay = 2;
  const [show, setShow] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(
    () => {
      let timer1 = setTimeout(() => setShow(true), delay * 1000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    []
  );
  if (!isAuth && show) {
    navigation.navigate('Auth')
  } else if (show) {
    return <></>;
  } else
    return (
      <NativeBaseProvider>
        <Center flex={1}>
          <Spinner size="lg" color="blue.500" />
        </Center>
      </NativeBaseProvider>
    );
}
