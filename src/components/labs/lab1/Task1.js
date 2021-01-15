import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import axios from 'axios';

import Markdown from '../../Markdown';
import { BinMask, IntMask } from '../../masks/';
import { Objects } from '../../../misc/';

const SIZE = 32;

const task = `
# Задание 1
    
С клавиатуры вводится $32$-х разрядное целое число $a$ в двоичной системе 
счисления.
   
1. Вывести $k$−ый бит числа $a$. Номер бита предварительно запросить у 
пользователя. 
2. Установить/снять $k$−ый бит числа $a$.
3. Поменять местами $i$−ый и $j$−ый биты в числе $a$. Числа $i$ и $j$ 
предварительно запросить у пользователя.
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
    padInputBin(SIZE);

    const data = {
      binary,
      ...{
        1.1: { k: param1 },
        1.2: { k: param2 },
        1.3: { i: param3i, j: param3j },
        1.4: { m: param4 },
      }[id],
    };

    if (Objects.containsFalsy(data)) {
      outputSetter('');
      return false;
    }

    axios
      .post('/labs/' + id, data)
      .then((res) => outputSetter(res.data.result))
      .catch((err) => {
        console.error(err);
        outputSetter('');
      });
  };

  const padInputBin = () => setBinaryInput(binary.padEnd(32, '0'));

  return (
    <Box display='flex' flexDirection='column'>
      <Box mb={4}>
        <Markdown className={classes.markdown}>{task}</Markdown>
      </Box>

      <Box display='flex' flexDirection='column' pb={6}>
        <Box width={350} alignSelf='center' mb={4}>
          <BinMask
            className={classes.input}
            length={32}
            value={binary}
            onAccept={setBinaryInput}
          />
        </Box>

        <Box display='flex' mb={4} alignItems='center'>
          <Box mr={1}>
            <Typography variant='h6'>1.</Typography>
          </Box>

          <Box width={80} mr={1}>
            <IntMask
              className={classes.input}
              placeholder='k-й бит'
              min={0}
              max={31}
              value={param1}
              onAccept={setParam1}
            />
          </Box>

          <Box mr={1}>
            <Button variant='contained' onClick={onSubtask1Called}>
              Эти
            </Button>
          </Box>

          <BinMask
            out='true'
            className={classes.input}
            length={1}
            value={output1}
            onAccept={setOutput1}
          />
        </Box>

        <Box display='flex' mb={4} alignItems='center'>
          <Box mr={1}>
            <Typography variant='h6'>2.</Typography>
          </Box>

          <Box width={80} mr={1}>
            <IntMask
              className={classes.input}
              placeholder='k-й бит'
              min={0}
              max={31}
              value={param2}
              onAccept={setParam2}
            />
          </Box>

          <Box mr={1}>
            <Button variant='contained' onClick={onSubtask2Called}>
              Египтяне
            </Button>
          </Box>

          <BinMask
            out='true'
            length={32}
            value={output2}
            onAccept={setOutput2}
          />
        </Box>

        <Box display='flex' mb={4} alignItems='center'>
          <Box mr={1}>
            <Typography variant='h6'>3.</Typography>
          </Box>

          <Box width={80} mr={1}>
            <IntMask
              className={classes.input}
              placeholder='i-й бит'
              min={0}
              max={31}
              value={param3i}
              onAccept={setParam3i}
            />
          </Box>

          <Box width={80} mr={1}>
            <IntMask
              className={classes.input}
              placeholder='j-й бит'
              min={0}
              max={31}
              value={param3j}
              onAccept={setParam3j}
            />
          </Box>

          <Box mr={1}>
            <Button variant='contained' onClick={onSubtask3Called}>
              Просто
            </Button>
          </Box>

          <BinMask
            out='true'
            length={32}
            value={output3}
            onAccept={setOutput3}
          />
        </Box>

        <Box display='flex' mb={4} alignItems='center'>
          <Box mr={1}>
            <Typography variant='h6'>4.</Typography>
          </Box>

          <Box width={80} mr={1}>
            <IntMask
              className={classes.input}
              placeholder='m бит'
              min={0}
              max={32}
              value={param4}
              onAccept={setParam4}
            />
          </Box>

          <Box mr={1}>
            <Button variant='contained' onClick={onSubtask4Called}>
              Чокнутые
            </Button>
          </Box>

          <BinMask
            out='true'
            className={classes.input}
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
  input: {
    caretColor: 'gray',
  },
}));
