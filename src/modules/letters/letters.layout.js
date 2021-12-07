/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  lettersData: PropTypes.arrayOf(Object).isRequired,
  handlePressLetter: PropTypes.func.isRequired,
  word: PropTypes.string,
  matchWord: PropTypes.bool.isRequired,
  handleCleanWord: PropTypes.func.isRequired,
};

const defaultProps = {
  word: '',
};

const LettersLayout = ({
  lettersData,
  handlePressLetter,
  word,
  matchWord,
  handleCleanWord,
}) => {
  const keyExtractor = (item, index) => `${index.toString()}_2`;
  let ScreenHeight = Dimensions.get('window').height;

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.touchableOpacity,
          {backgroundColor: item.state ? '#6BB333' : '#F7872F'},
        ]}
        disabled={item.state}
        onPress={() => handlePressLetter(item)}>
        <Text style={styles.text}> {item.letter} </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{height: ScreenHeight}}>
      <View style={styles.button}>
        <Button
          title="Clear Word"
          color={'grey'}
          onPress={() => handleCleanWord()}
          disabled={word !== '' ? false : true}
        />
      </View>
      <View style={styles.gridView}>
        <FlatList
          data={lettersData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={4}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={[styles.textInput, {color: matchWord ? '#6BB333' : 'red'}]}
          value={`${word}`}
          editable={false}
          selectTextOnFocus={false}
        />
        {!word ? (
          <></>
        ) : (
          <Text
            style={[styles.textValid, {color: matchWord ? '#6BB333' : 'red'}]}>
            {matchWord ? 'Valid' : 'Invalid'}
          </Text>
        )}
      </View>
    </View>
  );
};

const DeviceWidth = Dimensions.get('window').width;

const styles = {
  touchableOpacity: {
    width: DeviceWidth * 0.2,
    height: DeviceWidth * 0.2,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#970000',
  },
  gridView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    height: 70,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginTop: DeviceWidth * 0.1,
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  textInput: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  textValid: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
};

LettersLayout.propTypes = propTypes;
LettersLayout.defaultProps = defaultProps;

export default LettersLayout;
