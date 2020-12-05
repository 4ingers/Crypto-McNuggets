import React, { useState } from 'react';
import Markdown from '../../Markdown';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Button } from '@material-ui/core';
import axios from 'axios';

import BinaryMask from '../../masks/BinaryMask';

const task = `
# Задание 3
    
Поменять местами байты в заданном **32**-х разрядном целом числе. Перестановка задается пользователем.
`;

const Task3 = () => {
  const LEN = 32;

  const classes = useStyles();

  const [binaryInput, setBinaryInput] = useState('');

  const [paramI, setParamI] = useState('');
  const [paramJ, setParamJ] = useState('');

  const [output, setOutput] = useState('');

  const onTaskCalled = () => {
    padBinaryInput(LEN);

    const data = {
      binary: binaryInput,
      i: paramI,
      j: paramJ,
    };

    axios
      .post('/labs/3', data)
      .then((res) => {
        const { result } = res.data;
        setOutput(result || '');
      })
      .catch((err) => {
        console.error(err);
        setOutput('');
      });
  };

  const padBinaryInput = (length) =>
    setBinaryInput(binaryInput.padEnd(length, '0'));

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box mb={3}>
        <Markdown className={classes.task}>{task}</Markdown>
      </Box>

      <Box width={LEN * 10} maxWidth='100%' mb={3}>
        <BinaryMask
          className={classes.binaryInput}
          length={LEN}
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
        <Box mr={2} width={30}>
          <TextField
            placeholder='j'
            value={paramJ}
            onChange={(e) => setParamJ(e.target.value)}
          />
        </Box>
        <Button variant='contained' onClick={onTaskCalled}>
          Погнале
        </Button>
      </Box>
      <BinaryMask
        out='true'
        length={LEN}
        value={output}
        onAccept={setOutput}
      />
    </Box>
  );
};

export default Task3;

const useStyles = makeStyles((theme) => ({
  task: {
    ...theme.typography.body2,
  },
  binaryInput: {
    caretColor: 'gray',
  },
}));
