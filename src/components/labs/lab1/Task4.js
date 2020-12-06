import React, { useState } from 'react';
import Markdown from '../../Markdown';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import axios from 'axios';

import { BinMask, IntMask } from '../../masks/';
import { Conversions } from '../../../misc/';

const task = `
# Задание 4
    
Найти максимальную степень $2$, на которую делится данное целое число. 

*Примечание.* Операторами цикла пользоваться нельзя.
`;

const Task4 = () => {
  const LEN = 32;

  const classes = useStyles();

  const [inputBin, setInputBin] = useState('');
  const [inputInt, setInputInt] = useState('');

  const [output, setOutput] = useState('Тут будет ответ...');

  const binChanged = (bin) => {
    const int = Conversions.binToInt(bin);
    setInputBin(bin);
    setInputInt(int);
  };

  const intChanged = (int) => {
    const bin = Conversions.intToBin(int);
    setInputInt(int);
    setInputBin(bin);
  };

  const setResult = (power) => {
    const parsed = parseInt(power, 10);
    const powered = 2 ** parsed
    const int = parseInt(inputInt, 10)
    console.log(power);
    if (!isNaN(parsed)) {
      setOutput(`
$$
p=${power}
$$
$$
2^{${power}} \\vert ${inputInt} \\iff ${inputInt} : ${powered} = ${int / powered}
$$
      `);
    } else {
      setOutput('Обосрамс..');
    }
  };

  const onTaskCalled = () => {
    padInputBin(LEN);

    const data = {
      binary: inputBin,
    };

    axios
      .post('/labs/4', data)
      .then((res) => {
        const { result } = res.data;
        setResult(result);
      })
      .catch((err) => {
        console.error(err);
        setResult('');
      });
  };

  const padInputBin = (length) => setInputBin(inputBin.padEnd(length, '0'));

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box mb={3}>
        <Markdown className={classes.markdown}>{task}</Markdown>
      </Box>

      <Box width={1 + LEN * 10} maxWidth='100%' mb={3}>
        <BinMask
          className={classes.input}
          length={LEN}
          value={inputBin}
          onAccept={binChanged}
        />
      </Box>

      <IntMask
        className={classes.input}
        value={inputInt}
        onAccept={intChanged}
      />

      <Box mb={3} display='flex'>
        <Button variant='contained' onClick={onTaskCalled}>
          Погнале
        </Button>
      </Box>

      <Markdown className={classes.markdown}>{output}</Markdown>
    </Box>
  );
};

export default Task4;

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body1,
  },
  inputBin: {
    caretColor: 'gray',
  },
}));
