import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import axios from 'axios';

import Markdown from '../../MarkdownMath';
import BinaryMask from '../../masks/BinaryMask';

const task = `
# Задание 5

Пусть $x$ – целое число. Найти такое $p$, что $2^p \\leqslant x \\leqslant 2^{p+1}$ .
`;

const Task5 = () => {
  const LEN = 32;
  const classes = useStyles();

  const [binaryInput, setBinaryInput] = useState('');
  const [output, setOutput] = useState('');

  const onTaskCalled = () => {
    padBinaryInput(LEN);

    const data = { binary: binaryInput };

    axios
      .post('/labs/5', data)
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
        <Markdown className={classes.task} source={task}>{task}</Markdown>
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
        <Button variant='contained' onClick={onTaskCalled}>
          Погнале
        </Button>
      </Box>
      <BinaryMask out='true' length={LEN} value={output} onAccept={setOutput} />
    </Box>
  );
};

export default Task5;

const useStyles = makeStyles((theme) => ({
  task: {
    ...theme.typography.body1,
  },
  binaryInput: {
    caretColor: 'gray',
  },
}));
