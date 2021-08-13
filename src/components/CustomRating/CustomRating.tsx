import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { HStack, Stack, Center, NativeBaseProvider } from 'native-base';

import { AntDesign } from '@expo/vector-icons';
const CustomRating = ({
  size,
  totalStars,
  selectedStar,
  fixRating,
  fullStarColor = '#FFCC00',
}) => {
  const [getStarNumber, setStarNumber] = useState(0);

  let arr = [];
  for (let i = 1; i <= totalStars; i++) {
    arr.push(i);
  }
  useEffect(() => {
    if (fixRating !== 0) {
      setStarNumber(fixRating);
    }
  }, []);
  const setRating = (value: number) => {
    selectedStar(value - 1);
    setStarNumber(value);
  };
  return (
    <SafeAreaView>
      <HStack space={1} alignItems="center">
        {arr.map((item) => (
          <TouchableOpacity
            onPress={() => {
              setRating(item + 1);
            }}
            key={item + 1}
          >
            {item <= fixRating ? (
              <AntDesign
                name="star"
                size={size}
                color={fullStarColor}
                key={item + 1}
              />
            ) : (
              <AntDesign
                name="staro"
                size={size}
                color={fullStarColor}
                key={item + 1}
              />
            )}
          </TouchableOpacity>
        ))}
      </HStack>
    </SafeAreaView>
  );
};

export default CustomRating;

const styles = StyleSheet.create({});
