import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import LettersLayout from './letters.layout';

const lettersData = [
  {letter: 'L', state: false},
  {letter: 'I', state: false},
  {letter: 'S', state: false},
  {letter: 'T', state: false},
  {letter: 'O', state: false},
  {letter: 'F', state: false},
  {letter: 'A', state: false},
  {letter: 'T', state: false},
  {letter: 'S', state: false},
  {letter: 'T', state: false},
  {letter: 'R', state: false},
  {letter: 'S', state: false},
  {letter: 'O', state: false},
  {letter: 'R', state: false},
  {letter: 'A', state: false},
  {letter: 'Y', state: false},
];

test('render letters', () => {
  const mockHandler = jest.fn();
  const {getAllByText} = render(
    <LettersLayout
      lettersData={lettersData}
      matchWord={true}
      handlePressLetter={mockHandler}
      handleCleanWord={mockHandler}
    />,
  );
  expect(getAllByText('L').length).toBe(1);
  expect(getAllByText('I').length).toBe(1);
  expect(getAllByText('S').length).toBe(3);
  expect(getAllByText('T').length).toBe(3);
  expect(getAllByText('O').length).toBe(2);
  expect(getAllByText('F').length).toBe(1);
  expect(getAllByText('A').length).toBe(2);
  expect(getAllByText('R').length).toBe(2);
  expect(getAllByText('Y').length).toBe(1);
});

test('render valid word and press letter', () => {
  const word = 'START';
  const mockHandler = jest.fn();
  const component = render(
    <LettersLayout
      lettersData={lettersData}
      word={word}
      matchWord={true}
      handlePressLetter={mockHandler}
      handleCleanWord={mockHandler}
    />,
  );
  const button = component.getByText('L');
  fireEvent.press(button);
  component.getByText('START');
  component.getByText('Valid');
  expect(mockHandler).toHaveBeenCalledTimes(1);
});

test('render invalid word and press clean word', () => {
  const word = 'START';
  const mockHandler = jest.fn();
  const component = render(
    <LettersLayout
      lettersData={lettersData}
      word={word}
      matchWord={false}
      handlePressLetter={mockHandler}
      handleCleanWord={mockHandler}
    />,
  );
  const button = component.getByText('Clear Word');
  fireEvent.press(button);
  component.getByText('START');
  component.getByText('Invalid');
  expect(mockHandler).toHaveBeenCalledTimes(1);
});
