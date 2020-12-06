import React, { useState } from 'react';
import Markdown from '../../Markdown';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import axios from 'axios';

import { IntMask, BinMask } from '../../masks/';

const BIN_SIZE = 32;

const task = `
# Задание 2
    
1. "Склеить" первые $i$ битов с последними $i$ битами из целого числа длиной 
$len$ битов. 
  
   *Пример.* Пусть есть $12$-ти разрядное целое число, представленное в двоичной
    системе счисления \`100011101101\`. "Склеим" первые $3$ и последние $3$ 
    бита, получим \`100101\`.

2. Получить биты из целого числа длиной $len$ битов, находящиеся между первыми 
$i$ битами и последними $i$ битами. 

   *Пример.* Пусть есть $12$-ти разрядное целое число, представленное в двоичной
    системе счисления – \`100011101101\`. Получим биты находящиеся между первыми
     $3$ и последними $3$ битами: \`011101\`.
`;

const Task2 = () => {
  const classes = useStyles();

  const [inputBin, setInputBin] = useState('');

  const [binSize, setBinSize] = useState(BIN_SIZE);
  const [inputBinSize, setInputBinSize] = useState(BIN_SIZE);

  const [inputI, setInputI] = useState('');

  const [outputInner, setOutputInner] = useState('');
  const [outputOuter, setOutputOuter] = useState('');

  const onTaskCalled = () => {
    padInputBin(binSize);

    const data = {
      binary: inputBin,
      len: inputBinSize,
      i: inputI,
    };

    axios
      .post('/labs/2', data)
      .then((res) => {
        const { result } = res.data;
        setOutputInner(result.inner || '');
        setOutputOuter(result.outer || '');
      })
      .catch((err) => {
        console.error(err);
        setOutputInner('');
        setOutputOuter('');
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

      <Box width={1 + binSize * 10} maxWidth='100%' mb={3}>
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
      <BinMask
        out='true'
        length={outputOuter.length + 1}
        value={outputOuter}
        onAccept={setOutputOuter}
      />
      <BinMask
        out='true'
        length={outputInner.length + 1}
        value={outputInner}
        onAccept={setOutputInner}
      />
    </Box>
  );
};

export default Task2;

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body1,
  },
  inputBin: {
    caretColor: 'gray',
  },
}));
