import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  FormControl,
  Input,
  Stack,
  TextArea,
  Select,
  Popover,
  Button,
  Modal,
  Text,
  Alert,
  HStack,
} from 'native-base';
import StarRating from 'react-native-star-rating';
import { LogBox } from 'react-native';
import CustomRating from '../CustomRating/CustomRating';

const AddBooks = ({
  book,
  setBook,
  error,
  isInvalid,
  success,
  saveBook,
  isSaveError,
  isDisabled,
  checkFilled,
  authors,
}) => {
  // console.log(authors);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [author, setAuthor] = React.useState('');
  const [authError, setAuthError] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState('none');
  const [title, setTitle] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [reactElem, setReactElem] = React.useState(<></>);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setReady(true);
      if (success === 1 || success === 0) {
        setTitle('');
        setRating(0);
        setDescription('');
        setSelectedValue('None');
        setReactElem(<></>);
      }
    }, 1500);
  }, []);
  const saveAuthor = () => {
    if (author === '' || author === 'add') {
      setAuthError('Give Proper Name');
    } else {
      setBook({ ...book, author: author });
      setReactElem(
        <Select.Item
          label={author}
          value={author}
          key="0011000011000001101000010110111011"
        />
      );
      setAuthError('');
      setSelectedValue(author);
      setModalVisible(false);
      checkFilled();
    }
  };
  const checkAuthor = (value: any = '') => {
    if (value === 'add') {
      setModalVisible(true);
    } else {
      setSelectedValue(value);
      setBook({ ...book, author: value });
      checkFilled();
    }
  };
  const changeRating = (value: number) => {
    setBook({
      rating: value,
      title: title,
      description: description,
      author: selectedValue,
    });
    setRating(value);
    checkFilled();
    
  };
  //
  return (
    <>
      <Modal isOpen={modalVisible}>
        <Modal.Content>
          {/* <Modal.CloseButton /> */}
          <Modal.Header>Add Author</Modal.Header>
          <Modal.Body>
            <Text style={{ color: 'red' }}>{authError}</Text>
            <Input
              mt={4}
              placeholder="Click here..."
              value={author}
              onChange={(evt) => setAuthor(evt.nativeEvent.text)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button
                _text={{
                  color: '#005EB8',
                }}
                onPress={saveAuthor}
                variant="unstyled"
              >
                SAVE
              </Button>
              <Button
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                colorScheme="secondary"
              >
                CLOSE
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      

      <FormControl isRequired isInvalid={isInvalid.author}>
        <Stack mx={4}>
          <FormControl.Label>Author</FormControl.Label>
          <Select
            p={2}
            placeholder="Author"
            onValueChange={(itemValue) => {
              checkAuthor(itemValue);
            }}
            selectedValue={selectedValue}
          >
            <Select.Item label="Select Author" value="none" disabled />
            {reactElem}
            {authors?.map((author, index) => (
              <Select.Item label={author} value={author} key={index} />
            ))}
            <Select.Item label="Add Author" value="add" />
          </Select>

          {isInvalid.author && selectedValue === '' && (
            <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
          )}
        </Stack>
      </FormControl>

      <FormControl isRequired isInvalid={isInvalid.title}>
        <Stack mx={4}>
          <FormControl.Label>Book Title</FormControl.Label>
          <Input
            p={2}
            placeholder="Book title"
            value={book.title}
            onChange={(evt) => {
              // console.log(evt.nativeEvent.text);
              setTitle(evt.nativeEvent.text);
              setBook({ ...book, title: evt.nativeEvent.text });
              checkFilled();
            }}
          />
          {isInvalid.title && (
            <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
          )}
        </Stack>
      </FormControl>
      <FormControl isRequired isInvalid={isInvalid.description}>
        <Stack mx={4}>
          <FormControl.Label>Book Details</FormControl.Label>
          <TextArea
            numberOfLines={4}
            placeholder="Book Description"
            value={book.description}
            onChange={(evt) => {
              setDescription(evt.nativeEvent.text);
              setBook({ ...book, description: evt.nativeEvent.text });
              checkFilled();
            }}
          />
          {isInvalid.description && (
            <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
          )}
        </Stack>
      </FormControl>

      <FormControl>
        <HStack space={5} alignItems="center" style={{ margin: 20 }}>
          <Text>Rating: </Text>
          <Text style={{ color: '#005EB8' }}>{rating}/5</Text>
          <CustomRating
            totalStars={5}
            selectedStar={(value) => {
              changeRating(value);
              console.log(value);
            }}
            fixRating={book.rating}
            size={30}
            fullStarColor={'#005EB8'}
          />

          {/* <StarRating
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={book.rating}
            selectedStar={changeRating}
            fullStarColor={'#005EB8'}
          /> */}
        </HStack>
      </FormControl>
      <FormControl isRequired isInvalid>
        <Stack mx={4} style={{ marginTop: 0 }}>
          <Button
            _text={{
              color: '#005EB8',
            }}
            variant="ghost"
            onPress={() => {
              setBook({
                rating: rating,
                title: title,
                description: description,
                author: selectedValue,
              });
              saveBook();
            }}
            isDisabled={isDisabled}
          >
            Save
          </Button>
        </Stack>
      </FormControl>
    </>
  );
};

export default AddBooks;

const styles = StyleSheet.create({});
