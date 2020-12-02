import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';

import BinaryMask from '../masks/BinaryMask';

const task = `
# Задание 1
    
С клавиатуры вводится 32-х разрядное целое число a в двоичной системе счисления.
   
1. Вывести k−ый бит числа a. Номер бита предварительно запросить у пользователя. 
2. Установить/снять k −ый бит числа a.
3. Поменять местами i −ый и j −ый биты в числе a. Числа i и j предварительно запросить у пользователя.
4. Обнулить младшие m бит.
`;

const Lab1 = () => {
  const classes = useStyles();
  const [binaryInput, setBinaryInput] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3i, setInput3i] = useState('');
  const [input3j, setInput3j] = useState('');
  const [input4, setInput4] = useState('');

  const [output1, setOutput1] = useState('');
  const [output2, setOutput2] = useState('');
  const [output3, setOutput3] = useState('');
  const [output4, setOutput4] = useState('');

  const onTask1Called = () => {
    padBinaryInput();

    const data = {
      binary: binaryInput,
      k: input1,
    };

    axios.post('/labs/1.1', data).then((res) => {
      const { result } = res.data;
      setOutput1(result || '');
    }).catch(err => {
      console.error(err);
      setOutput1('');
    });
  };

  const padBinaryInput = () => setBinaryInput(binaryInput.padEnd(32, '0'));

  return (
    <Box display='flex' flexDirection='column'>
      <Markdown className={classes.task}>{task}</Markdown>

      <Box display='flex' flexDirection='column' pb={6}>
        <BinaryMask
          className={cn(classes.binary32, classes.binaryInput)}
          length={32}
          value={binaryInput}
          onAccept={setBinaryInput}
        />

        <Box display='flex' className={classes.implementation}>
          <Typography variant='h5'>1.</Typography>
          <TextField
            className={cn(classes.chooseBit, classes.flexItem)}
            placeholder='k-й бит'
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            variant='filled'
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.flexItem}
            onClick={onTask1Called}
          >
            {'-->'}
          </Button>
          <BinaryMask
            out={true}
            className={cn(
              classes.binary1,
              classes.binaryOutput,
              classes.flexItem
            )}
            length={1}
            value={output1}
            onAccept={setOutput1}
          />
        </Box>

        <Box display='flex' className={classes.implementation}>
          <Typography variant='h5'>2.</Typography>
          <TextField
            className={cn(classes.chooseBit, classes.flexItem)}
            placeholder='k-й бит'
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            variant='filled'
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.flexItem}
          >
            {'-->'}
          </Button>
          <BinaryMask
            out={true}
            className={cn(
              classes.binary32,
              classes.binaryOutput,
              classes.flexItem
            )}
            length={1}
          />
        </Box>

        <Box display='flex' className={classes.implementation}>
          <Typography variant='h5'>3.</Typography>
          <TextField
            className={cn(classes.chooseBit, classes.flexItem)}
            placeholder='i-й бит'
            value={input3i}
            onChange={(e) => setInput3i(e.target.value)}
            variant='filled'
          />
          <TextField
            className={cn(classes.chooseBit, classes.flexItem)}
            placeholder='j-й бит'
            value={input3j}
            onChange={(e) => setInput3j(e.target.value)}
            variant='filled'
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.flexItem}
          >
            {'-->'}
          </Button>
          <BinaryMask
            out={true}
            className={cn(
              classes.binary32,
              classes.binaryOutput,
              classes.flexItem
            )}
            length={1}
          />
        </Box>

        <Box display='flex' className={classes.implementation}>
          <Typography variant='h5'>4.</Typography>
          <TextField
            className={cn(classes.chooseBit, classes.flexItem)}
            placeholder='m бит'
            value={input4}
            onChange={(e) => setInput4(e.target.value)}
            variant='filled'
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.flexItem}
          >
            {'-->'}
          </Button>
          <BinaryMask
            out={true}
            className={cn(
              classes.binary32,
              classes.binaryOutput,
              classes.flexItem
            )}
            length={1}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Lab1;

const useStyles = makeStyles((theme) => ({
  task: {
    marginBottom: theme.spacing(3),
  },
  flexItem: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  binary32: {
    width: '350px',
  },
  binary1: {
    width: '110px',
  },
  binaryInput: {
    alignSelf: 'center',
    caretColor: 'gray',
    marginBottom: theme.spacing(3),
    minWidth: '280px',
  },
  binaryOutput: {
    minWidth: '110px',
  },
  chooseBit: {
    width: '80px',
  },
  implementation: {
    marginBottom: theme.spacing(3),
  },
}));
