import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import axios from 'axios';

import Markdown from '../../Markdown';
import { IntMask, BinMask } from '../../masks/';
import { Strings } from '../../../misc/';

const BIN_SIZE = 32;
const task = `
# Задание 7
    
Написать макросы циклического сдвига в $2^p$ разрядном целом числе на $n$ бит 
влево и вправо.
`;

const Task7 = () => {
  const classes = useStyles();

  const [inputBin, setInputBin] = useState('');

  const [binSize, setBinSize] = useState(BIN_SIZE);
  const [inputBinSize, setInputBinSize] = useState(BIN_SIZE);

  const [inputI, setInputI] = useState('');

  const [output, setOutput] = useState('');

  const setResult = (result) =>
    setOutput(`
$$
${Strings.reverse(inputBin)} \\ggg ${inputI} = ${Strings.reverse(result.right)}
$$
$$
${Strings.reverse(inputBin)} \\lll ${inputI} = ${Strings.reverse(result.left)}
$$
  `);

  const onTaskCalled = () => {
    padInputBin(binSize);

    const data = {
      binary: inputBin,
      len: inputBinSize,
      i: inputI,
    };

    axios
      .post('/labs/7', data)
      .then((res) => {
        const { result } = res.data;
        setResult(result);
      })
      .catch((err) => {
        console.error(err);
        setOutput('Эти египтяне просто чокнутые');
      });
  };

  const padInputBin = (length) =>
    setInputBin(inputBin.padEnd(length, '0'));

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
            max={BIN_SIZE}
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
        <Box mr={2} width={30}>
          <IntMask
            className={classes.input}
            placeholder={'i'}
            min={1}
            max={64}
            value={inputI}
            onAccept={setInputI}
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

export default Task7;

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body1,
  },
  inputBin: {
    caretColor: 'gray',
  },
}));
