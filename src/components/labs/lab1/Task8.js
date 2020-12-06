import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import axios from 'axios';

import Markdown from '../../Markdown';
import { IntMask, BinMask, TextMask } from '../../masks/';
import { Strings} from '../../../misc/'

const BIN_SIZE = 8;
const task = `
# Задание 8
    
Дано $n$ битовое данное. Задана перестановка бит $(1, 8, 23, 0, 16, \\ldots )$. 
Написать функцию, выполняющую эту перестановку. 

**Пример.** $1_7 0_6 1_5 0_4 1_3 1_2 1_1 0_0 \\to 
1_5 1_3 1_7 1_1 0_4 0_0 0_6 1_2$. Биты, переставлены в соответствии с 
перестановкой $(5, 3, 7, 1, 4, 0, 6, 2)$.
`;

const Task8 = () => {
  const classes = useStyles();

  const [inputBin, setInputBin] = useState('');

  const [binSize, setBinSize] = useState(BIN_SIZE);
  const [inputBinSize, setInputBinSize] = useState(BIN_SIZE);

  const [inputPermutation, setInputPermutation] = useState('');

  const [output, setOutput] = useState('');

  const setResult = (result) =>
    setOutput(`
$$
(${Strings.reverse(inputBin)}) \\to ${Strings.reverse(result)}
$$
  `);

  const onTaskCalled = () => {
    padInputBin(binSize);

    const data = {
      binary: inputBin,
      permutation: inputPermutation
    };

    axios
      .post('/labs/8', data)
      .then((res) => {
        const { result } = res.data;
        setResult(result);
      })
      .catch((err) => {
        console.error(err);
        setOutput('Эти египтяне просто чокнутые');
      });
  };

  const padInputBin = (length) => setInputBin(inputBin.padEnd(length, '0'));

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box mb={3}>
        <Markdown className={classes.markdown}>{task}</Markdown>
      </Box>

      <Box display='flex' alignItems='center' mb={2}>
        <Box mr={1}>
          <Typography>Разрядность числа:</Typography>
        </Box>
        <Box mr={1} width={40}>
          <IntMask
            className={classes.input}
            placeholder={BIN_SIZE.toString()}
            min={1}
            max={32}
            value={inputBinSize}
            onAccept={setInputBinSize}
          />
        </Box>
        <Button variant='contained' onClick={() => setBinSize(inputBinSize)}>
          Применить
        </Button>
      </Box>

      <Box width={binSize * 10} maxWidth='100%' mb={3}>
        <BinMask
          className={classes.inputBin}
          length={binSize}
          value={inputBin}
          onAccept={setInputBin}
        />
      </Box>

      <Box mb={3} display='flex'>
        <Box mr={2} width={5 + binSize * 30}>
          <TextMask
            className={classes.input}
            placeholder='Мешанина'
            fullWidth={true}
            unmask={true}
            value={inputPermutation}
            onAccept={setInputPermutation}
            mask={`(${Array(binSize).fill('D').join('{,}` ')})`}
            // lazy={false} // make placeholder always visible
            // definitions={{ '1': /[1-9]/ }}
            blocks={{
              'D': {
                mask: Number,
                scale: 0,
                min: 0,
                max: binSize - 1,
              }
            }}
          />
        </Box>
        <Button variant='contained' onClick={onTaskCalled}>
          Погнале
        </Button>
      </Box>
      <Markdown className={classes.markdown}>{output}</Markdown>
    </Box>
  );
};

export default Task8;

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body1,
  },
  inputBin: {
    caretColor: 'gray',
  },
}));
