import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import axios from 'axios';

import Markdown from '../../MarkdownMath';
import { BinMask, IntMask } from '../../masks/';
import { Conversion } from '../../../misc/';

const task = `
# Задание 5

Пусть $x$ – целое число. Найти такое $p$, что $2^p \\leqslant x \\leqslant 2^{p+1}$ .
`;

const Task5 = () => {
  const LEN = 32;
  const classes = useStyles();

  const [inputBin, setInputBin] = useState('');
  const [inputInt, setInputInt] = useState('');

  const [output, setOutput] = useState('Тут будет ответ...');

  const binChanged = (bin) => {
    const int = Conversion.binToInt(bin);
    setInputBin(bin);
    setInputInt(int);
  };

  const intChanged = (int) => {
    const bin = Conversion.intToBin(int);
    setInputInt(int);
    setInputBin(bin);
  };

  const setResult = (power) => {
    const parsed = parseInt(power, 10);
    if (!isNaN(parsed)) {
      setOutput(`
$$
p = ${parsed}
$$
$$
2^{${parsed}} \\leqslant ${inputInt} \\leqslant 2^{${parsed + 1}}
$$
$$
${2 ** parsed} \\leqslant ${inputInt} \\leqslant ${2 ** (parsed + 1)}
$$
      `)
    } else {
      setOutput('Обосрамс..')
    }
  };

  const onTaskCalled = () => {
    padBinaryInput(LEN);

    const data = { binary: inputBin };

    axios
      .post('/labs/5', data)
      .then((res) => {
        const { result } = res.data;
        setResult(result);
      })
      .catch((err) => {
        console.error(err);
        setOutput('Обосрамс..')
      });
  };

  const padBinaryInput = (length) =>
    setInputBin(inputBin.padEnd(length, '0'));

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

export default Task5;

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body1,
  },
  input: {
    caretColor: 'gray',
  },
}));
