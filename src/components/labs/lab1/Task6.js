import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import axios from 'axios';

import Markdown from '../../Markdown';
import { BinMask, IntMask } from '../../masks/';
import { Strings } from '../../../misc/'

const BIN_SIZE = 32;

const task = `
# Задание 6

Дано $2^p$ разрядное целое число. "Поксорить" все биты этого числа друг с 
другом. 

*Пример.* $101110001 \\to 1; 11100111 \\to 0$.
`;

const Task5 = () => {
  const classes = useStyles();

  const [inputBin, setInputBin] = useState('');

  const [binSize, setBinSize] = useState(BIN_SIZE);
  const [inputBinSize, setInputBinSize] = useState(BIN_SIZE.toString());

  const [output, setOutput] = useState('Тут будет ответ...');

  const setResult = (value) =>
    setOutput(`
$$
${Strings.reverse(inputBin)} \\to ${value}
$$
  `);

  const convertLength = () => {
    const converted = Number(inputBinSize);
    if (isNaN(converted) || converted < 1 || converted > 64)
      setInputBinSize('');
    setBinSize(converted);
  };

  const onTaskCalled = () => {
    padInputBin(binSize);
    const data = { binary: inputBin };

    axios
      .post('/labs/6', data)
      .then((res) => {
        const { result } = res.data;
        console.log(result);
        setResult(result);
      })
      .catch((err) => {
        console.error(err);
        setOutput('Обосрамс..');
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
            placeholder={BIN_SIZE}
            min={1}
            max={64}
            value={inputBinSize}
            onAccept={setInputBinSize}
          />
        </Box>
        <Button variant='contained' onClick={convertLength}>
          Применить
        </Button>
      </Box>

      <Box width={binSize * 10} maxWidth='100%' mb={3}>
        <BinMask
          className={classes.input}
          length={binSize}
          value={inputBin}
          onAccept={setInputBin}
        />
      </Box>

      <Box mb={3} display='flex'>
        <Button variant='contained' onClick={onTaskCalled}>
          Погнале
        </Button>
      </Box>

      <Markdown className={classes.markdown}>{output}</Markdown>
    </Box>
  );
};

export default Task5;

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body1,
  },
  input: {
    caretColor: 'gray',
  },
}));
