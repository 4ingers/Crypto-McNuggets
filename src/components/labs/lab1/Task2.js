import React, { useState } from 'react';
import Markdown from '../../Markdown';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';

import BinaryMask from '../../masks/BinaryMask';

const task = `
# Задание 2
    
1. "Склеить" первые *i* битов с последними *i* битами из целого числа длиной *len* битов. 
*Пример.* Пусть есть **12**-ти разрядное целое число, представленное в двоичной системе счисления *100011101101*. "Склеим" первые 3 и последние 3 бита, получим *100101*.

2. Получить биты из целого числа длиной *len* битов, находящиеся между первыми *i* битами и последними *i* битами. 
*Пример.* Пусть есть 12-ти разрядное целое число, представленное в двоичной системе счисления *100011101101*. Получим биты находящиеся между первыми 3 и последними 3 битами: *011101*.
`;

const Task2 = () => {
  const DEF_LEN = 32;

  const classes = useStyles();

  const [paramLen, setParamLen] = useState(DEF_LEN.toString());
  const [inputBinaryLen, setInputBinaryLen] = useState(DEF_LEN);

  const [binaryInput, setBinaryInput] = useState('');

  const [paramI, setParamI] = useState('');

  const [outputInner, setOutputInner] = useState('');
  const [outputOuter, setOutputOuter] = useState('');

  const convertLength = () => {
    const converted = Number(paramLen);
    console.log(converted);
    if (isNaN(converted) || converted < 1 || converted > 64) return false;
    setInputBinaryLen(converted);
  };

  const onTaskCalled = () => {
    padBinaryInput(inputBinaryLen);

    const data = {
      binary: binaryInput,
      len: paramLen,
      i: paramI,
    };

    axios
      .post('/labs/2', data)
      .then((res) => {
        const { result } = res.data;
        console.log(res.data);
        setOutputInner(result.inner || '');
        setOutputOuter(result.outer || '');
      })
      .catch((err) => {
        console.error(err);
        setOutputInner('');
        setOutputOuter('');
      });
  };

  const padBinaryInput = (length) =>
    setBinaryInput(binaryInput.padEnd(length, '0'));

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box mb={3}>
        <Markdown className={classes.task}>{task}</Markdown>
      </Box>

      <Box display='flex' alignItems='center' mb={2}>
        <Box mr={1}>
          <Typography>Разрядность числа:</Typography>
        </Box>
        <Box mr={1} width={40}>
          <TextField
            placeholder={paramLen}
            value={paramLen}
            onChange={(e) => setParamLen(e.target.value)}
          />
        </Box>
        <Button variant='contained' onClick={convertLength}>
          Применить
        </Button>
      </Box>

      <Box width={inputBinaryLen * 10} maxWidth='100%' mb={3}>
        <BinaryMask
          className={classes.binaryInput}
          length={inputBinaryLen}
          value={binaryInput}
          onAccept={setBinaryInput}
        />
      </Box>

      <Box mb={3} display='flex'>
        <Box mr={2} width={30}>
          <TextField
            placeholder='i'
            value={paramI}
            onChange={(e) => setParamI(e.target.value)}
          />
        </Box>
        <Button variant='contained' onClick={onTaskCalled}>
          Погнале
        </Button>
      </Box>
      <BinaryMask
        out='true'
        length={outputOuter.length + 1}
        value={outputOuter}
        onAccept={setOutputOuter}
      />
      <BinaryMask
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
  task: {
    ...theme.typography.body2,
  },
  binaryInput: {
    caretColor: 'gray',
  },
}));
