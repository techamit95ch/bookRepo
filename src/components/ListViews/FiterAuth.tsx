import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  Select,
  Divider,
  HStack,
  FormControl,
  Button,
  Stack,
  Link,
} from 'native-base';
// import StarRating from 'react-native-star-rating';
import CustomRating from '../CustomRating/CustomRating';
const FiterAuth = ({
  setFilterAuthor,
  filterAuthor,
  setViewBooks,
  allbooks,
  viewBooks,
  setRating,
}) => {
  const [rating, setRating1] = React.useState(0);
  const [getRating, setGetRating] = React.useState(0);

  const changeRating = (value: number) => {
    // setRating(value);
    // setRating1(value);
    const arr = viewBooks.filter((book) => book.rating === value);
    if (arr.length > 0) {
      setViewBooks(arr);
      setRating(value);
      setRating1(value);
    }
    if (!arr.length) {
      const arr2 = allbooks.filter((book) => book.rating === value);
      if (arr2.length > 0) {
        clearAll();
        setViewBooks(arr);
        // setRating(value);
        // setRating1(value);
      } else {
        clearAll();
      }
    }
    // console.log('Arr', arr);
    // console.log('viewBooks', viewBooks);
  };
  const clearAll = () => {
    setRating(0);
    setRating1(0);
    setFilterAuthor('');
    setViewBooks(allbooks);
  };

  return (
    <>
      <Stack mx={4} style={{ marginTop: 10, padding: 10, marginBottom: 10 }}>
        <FormControl style={{ justifyContent: 'center' }}>
          {/* <FormControl.Label >Select Item</FormControl.Label>
        <Select
          p={2}
          minWidth={200}
          placeholder="Author"
          onValueChange={(itemValue) => {
            setFilterAuthor(itemValue);
            searchAuthor(itemValue);
            setValue(itemValue);
          }}
          selectedValue={value}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />,
          }}
          variant={'filled'}
        >
          <Select.Item label="Select Author" value="none" disabled />
          <Select.Item label="All" value="All" />
          {authors.map((author,index) => (
            <Select.Item label={author} value={author} key={index}/>
          ))}
        </Select> */}
          <Button.Group
            variant="solid"
            isAttached
            space={6}
            mx={{
              base: 'auto',
              md: 0,
            }}
          >
            <Button mr={2} variant="ghost">
              {filterAuthor === '' ? 'No Author Selected' : filterAuthor}
            </Button>
            <Button
              colorScheme="danger"
              variant="ghost"
              onPress={() => clearAll()}
            >
              Clear All
            </Button>
          </Button.Group>
        </FormControl>
        <FormControl style={{ justifyContent: 'center' }}>
          <HStack space={5} alignItems="center">
            <Text>Book Rating: </Text>
            <Text style={{ color: '#005EB8' }}>{rating}/5</Text>
            <CustomRating
              totalStars={5}
              selectedStar={(value) => {
                changeRating(value);
                console.log(value);
              }}
              fixRating={rating}
              size={30}
            />
          </HStack>
          {/* <StarRating
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={rating}
            selectedStar={changeRating}
            fullStarColor={'#005EB8'}
          /> */}
        </FormControl>
      </Stack>
    </>
  );
};

export default FiterAuth;

const styles = StyleSheet.create({});
