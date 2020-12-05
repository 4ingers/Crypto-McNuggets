import React, { useState } from 'react';
import Markdown from '../../MarkdownMath';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';

import BinMask from '../../masks/BinMask';

const task = `
# Задание 1
    
С клавиатуры вводится $32$-х разрядное целое число $a$ в двоичной системе счисления.
   
1. Вывести $k$−ый бит числа $a$. Номер бита предварительно запросить у пользователя. 
2. Установить/снять $k$−ый бит числа $a$.
3. Поменять местами $i$−ый и $j$−ый биты в числе $a$. Числа $i$ и $j$ предварительно запросить у пользователя.
4. Обнулить младшие $m$ бит.
`;

const Task1 = () => {
  const classes = useStyles();

  const [binary, setBinaryInput] = useState('');

  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');
  const [param3i, setParam3i] = useState('');
  const [param3j, setParam3j] = useState('');
  const [param4, setParam4] = useState('');

  const [output1, setOutput1] = useState('');
  const [output2, setOutput2] = useState('');
  const [output3, setOutput3] = useState('');
  const [output4, setOutput4] = useState('');

  const onSubtask1Called = () => onSubtaskCalled('1.1', setOutput1);
  const onSubtask2Called = () => onSubtaskCalled('1.2', setOutput2);
  const onSubtask3Called = () => onSubtaskCalled('1.3', setOutput3);
  const onSubtask4Called = () => onSubtaskCalled('1.4', setOutput4);

  const onSubtaskCalled = (id, outputSetter) => {
    padBinaryInput();

    const getDataParams = () => {
      switch (id) {
        case '1.1':
          return { k: param1 };
        case '1.2':
          return { k: param2 };
        case '1.3':
          return { i: param3i, j: param3j };
        case '1.4':
          return { m: param4 };
        default:
          return { shitted: 'pants' };
      }
    };

    const data = {
      binary: binary,
      ...getDataParams(),
    };

    axios
      .post('/labs/' + id, data)
      .then((res) => {
        const { result } = res.data;
        console.log(res.data);
        outputSetter(result || '');
      })
      .catch((err) => {
        console.error(err);
        outputSetter('');
      });
  };

  const padBinaryInput = () => setBinaryInput(binary.padEnd(32, '0'));

  return (
    <Box display='flex' flexDirection='column'>
      <Markdown className={classes.markdown}>{task}</Markdown>

      <Box display='flex' flexDirection='column' pb={6}>
        <BinMask
          className={cn(classes.binary32, classes.inputBin)}
          length={32}
          value={binary}
          onAccept={setBinaryInput}
        />

        <Box display='flex' className={classes.implementation}>
          <Typography variant='h5'>1.</Typography>
          <TextField
            className={cn(classes.chooseBit, classes.flexItem)}
            placeholder='k-й бит'
            value={param1}
            onChange={(e) => setParam1(e.target.value)}
            variant='filled'
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.flexItem}
            onClick={onSubtask1Called}
          >
            {'-->'}
          </Button>
          <BinMask
            out="true"
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
            value={param2}
            onChange={(e) => setParam2(e.target.value)}
            variant='filled'
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.flexItem}
            onClick={onSubtask2Called}
          >
            {'-->'}
          </Button>
          <BinMask
            out="true"
            className={cn(
              classes.binary32,
              classes.binaryOutput,
              classes.flexItem
            )}
            length={32}
            value={output2}
            onAccept={setOutput2}
          />
        </Box>

        <Box display='flex' className={classes.implementation}>
          <Typography variant='h5'>3.</Typography>
          <TextField
            className={cn(classes.chooseBit, classes.flexItem)}
            placeholder='i-й бит'
            value={param3i}
            onChange={(e) => setParam3i(e.target.value)}
            variant='filled'
          />
          <TextField
            className={cn(classes.chooseBit, classes.flexItem)}
            placeholder='j-й бит'
            value={param3j}
            onChange={(e) => setParam3j(e.target.value)}
            variant='filled'
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.flexItem}
            onClick={onSubtask3Called}
          >
            {'-->'}
          </Button>
          <BinMask
            out="true"
            className={cn(
              classes.binary32,
              classes.binaryOutput,
              classes.flexItem
            )}
            length={32}
            value={output3}
            onAccept={setOutput3}
          />
        </Box>

        <Box display='flex' className={classes.implementation}>
          <Typography variant='h5'>4.</Typography>
          <TextField
            className={cn(classes.chooseBit, classes.flexItem)}
            placeholder='m бит'
            value={param4}
            onChange={(e) => setParam4(e.target.value)}
            variant='filled'
          />
          <Button
            variant='contained'
            color='primary'
            className={classes.flexItem}
            onClick={onSubtask4Called}
          >
            {'-->'}
          </Button>
          <BinMask
            out="true"
            className={cn(
              classes.binary32,
              classes.binaryOutput,
              classes.flexItem
            )}
            length={32}
            value={output4}
            onAccept={setOutput4}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Task1;

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body1,
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
  inputBin: {
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
    alignItems: 'center',
  },
}));
