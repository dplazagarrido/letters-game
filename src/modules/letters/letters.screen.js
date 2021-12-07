import React, {useEffect, useState} from 'react';
import lettersData from '../../files/test-board-1.json';
import dictionaryData from '../../files/dictionary.json';
import LettersLayout from './letters.layout';

const LettersScreen = () => {
  const [boardData, setBoardData] = useState([]);
  const [wordArray, setWordArray] = useState([]);
  const [word, setWord] = useState('');
  const [matchWord, setMatchWord] = useState(false);

  useEffect(() => {
    formatLettersData();
  }, []);

  const formatLettersData = () => {
    const data = lettersData.board.map(item => {
      return {letter: item, state: false};
    });
    setBoardData(data);
  };

  const handlePressLetter = item => {
    item.state = true;
    const arrayWord = [...wordArray, item.letter];
    const temporaryWord = arrayWord.join('');
    setWord(temporaryWord);

    dictionaryData.words.find(item => item === temporaryWord.toLowerCase())
      ? setMatchWord(true)
      : setMatchWord(false);
    setWordArray(arrayWord);
  };

  const handleCleanWord = () => {
    formatLettersData();
    setWordArray([]);
    setWord('');
  };

  return (
    <LettersLayout
      lettersData={boardData}
      handlePressLetter={handlePressLetter}
      word={word}
      matchWord={matchWord}
      handleCleanWord={handleCleanWord}
    />
  );
};

export default LettersScreen;
