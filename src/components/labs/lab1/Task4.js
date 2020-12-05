import React, { useState } from 'react';
import Markdown from '../../Markdown';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import axios from 'axios';

import BinaryMask from '../../masks/BinaryMask';

const task = `
# Задание 4
    
Найти максимальную степень **2**, на которую делится данное целое число. *Примечание.* Операторами цикла пользоваться нельзя.
`;

const Task4 = () => {
  const LEN = 32;

  const classes = useStyles();

  const [binaryInput, setBinaryInput] = useState('');

  const [output, setOutput] = useState('');

  const onTaskCalled = () => {
    padBinaryInput(LEN);

    const data = {
      binary: binaryInput,
    };

    axios
      .post('/labs/4', data)
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

export default Task4;

const useStyles = makeStyles((theme) => ({
  task: {
    ...theme.typography.body2,
  },
  binaryInput: {
    caretColor: 'gray',
  },
}));
