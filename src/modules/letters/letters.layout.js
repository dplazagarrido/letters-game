/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
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
      <TouchableOpacity
        style={styles.touchableOpacityClear}
        onPress={() => handleCleanWord()}>
        <View style={styles.viewClear}>
          <Text style={styles.textClearWord}>Clear Word</Text>
          <View style={styles.button}>
            <Text style={styles.textX}>X</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.gridView}>
        <FlatList
          data={lettersData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={4}
        />
      </View>
      <View style={styles.input}>
        <Text
          style={[styles.textInput, {color: matchWord ? '#6BB333' : 'red'}]}>
          {word}
        </Text>
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
    marginBottom: 5,
    marginLeft: 5,
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
    margin: 20,
  },
  input: {
    height: 70,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginTop: DeviceWidth * 0.1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  textInput: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
  },
  textValid: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  button: {
    borderRadius: 50,
    backgroundColor: 'lightgrey',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textX: {
    fontSize: 30,
    color: 'white',
  },
  textClearWord: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginHorizontal: 20,
    color: 'lightgrey',
  },
  touchableOpacityClear: {
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  viewClear: {
    flexDirection: 'row',
  },
};

LettersLayout.propTypes = propTypes;
LettersLayout.defaultProps = defaultProps;

export default LettersLayout;
