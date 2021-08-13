import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ListItem, Button, Icon, Divider } from 'react-native-elements';
// import { Book } from './../../interfaces/index';
import { AntDesign } from '@expo/vector-icons';

import {
  VStack,
  Center,
  Heading,
  NativeBaseProvider,
  Stack,
  Pressable,
  Text,
} from 'native-base';

import StarRating from 'react-native-star-rating';
import { updateRating, deleteBook } from '../../actions/books';
import { useDispatch } from 'react-redux';
import CustomRating from '../CustomRating/CustomRating';

const Book = ({ book, setAuthor, viewBooks, setViewBooks, user }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = React.useState(book.rating);
  const changeRating = (value: number) => {
    if (user.uid === book.uid) {
      let res = viewBooks.filter((result) => {
        if (result.id === book.id) {
          result.rating = value;
        }
        return result;
      });
      setViewBooks(res);
      setRating(value);
      dispatch(updateRating(book, value));
    }
  };
  // git remote add origin https://github.com/techamit95ch/booksApp.git
  // https://github.com/techamit95ch/booksApp.git

  const bookDelete = (id) => {
    let res = viewBooks.filter((result) => result?.id !== id);
    setViewBooks(res);
    dispatch(deleteBook(book.id));
  };
  const selectAuthor = (auth: string) => {
    let res = viewBooks.filter((result) => result?.author === auth);
    setViewBooks(res);
    setAuthor(auth);
  };

  return (
    <>
      <ListItem bottomDivider>
        <ListItem.Content>
          <Stack
            space={2}
            direction={'row'}
            style={{ justifyContent: 'space-between', display: 'flex' }}
          >
            <Stack
              space={2}
              direction={'column'}
              style={{ flex: 5, display: 'flex' }}
            >
              <Stack direction={'row'} alignItems="flex-start">
                <ListItem.Title style={{ color: '#005EB8' }}>
                  {book?.title}
                </ListItem.Title>
                <TouchableOpacity
                  style={styles.author}
                  onPress={() => {
                    // console.log(book?.author);
                    selectAuthor(book?.author);
                  }}
                >
                  <ListItem.Subtitle
                    style={{
                      marginLeft: 10,
                      flex: 3,
                      color: 'grey',
                      marginTop: 2,
                      fontSize: 13,
                    }}
                  >
                    Author:{' '}
                    <Text
                      italic
                      underline
                      style={{
                        marginLeft: 4,
                        color: '#005EB8',
                        fontSize: 15,
                      }}
                    >
                      {book?.author}
                    </Text>
                  </ListItem.Subtitle>
                </TouchableOpacity>
              </Stack>
              <Stack direction={'row'} style={{}}>
                {/* <StarRating
                  style={{ height: 2 }}
                  disabled={false}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  rating={rating}
                  selectedStar={changeRating}
                  fullStarColor={'#FFCC00'}
                /> 
                */}
                <CustomRating
                  totalStars={5}
                  selectedStar={(value) => {
                    changeRating(value);
                    // console.log(value);
                  }}
                  fixRating={rating}
                  size={20}
                />
              </Stack>
            </Stack>
            <Stack
              space={2}
              direction={'column'}
              alignItems="flex-end"
              // style={{ , }}
              style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
            >
              {user?.uid === book?.uid ? (
                <>
                  <Button
                    title=""
                    icon={<AntDesign name="delete" size={20} color="#E00000" />}
                    buttonStyle={{
                      backgroundColor: 'white',
                    }}
                    onPress={() => bookDelete(book.id)}
                  />
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </ListItem.Content>
        {/* <ListItem.Chevron /> */}
      </ListItem>
      <Divider />
      {/* <Text>{book?.title}</Text> */}
    </>
  );
};

export default Book;

const styles = StyleSheet.create({
  author: {
    // display: 'flex',

    textAlign: 'center',
    // margin: 20,
    // padding: 10,
    marginLeft: 5,
    borderRadius: 8,
  },
});
