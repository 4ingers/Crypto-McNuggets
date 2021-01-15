import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography, TextField } from '@material-ui/core';
import axios from 'axios';

import Markdown from '../../Markdown';
import { Objects } from '../../../misc/';

const KEY_SIZE = 8;

const task = `
# Задание 9
    
Разработать приложение, шифрующее и дешифрующее файл с помощью алгоритма 
Вернама.

`;

const Task9 = () => {
  const classes = useStyles();

  const [inputFilename, setInputFilename] = useState('');
  const [inputKey, setInputKey] = useState('');

  const [output, setOutput] = useState('');

  const onTaskCalled = () => {
    const data = {
      filename: inputFilename,
      key: inputKey,
    };

    if (Objects.containsFalsy(data)) {
      setOutput('А гвоздей жареных?');
      return false;
    }

    axios
      .post('/labs/9', data)
      .then((res) => {
        const { result } = res.data;
        setOutput(result);
      })
      .catch((err) => {
        console.error(err);
        setOutput('Эти египтяне просто чокнутые');
      });
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box mb={3}>
        <Markdown className={classes.markdown}>{task}</Markdown>
      </Box>

      <Box mb={3}>
        <label htmlFor='upload-photo'>
          <input
            style={{ display: 'none' }}
            id='upload-photo'
            name='upload-photo'
            type='file'
            onChange={(e) => setInputFilename(e.target.files[0].name)}
          />

          <Button color='primary' variant='contained' component='span'>
            Чьдо заживруем?
          </Button>
        </label>
      </Box>

      <Box mb={3}>
        <Typography>{inputFilename}</Typography>
      </Box>

      <Box mb={3} display='flex'>
        <Box mr={2} width={200}>
          <TextField
            className={classes.input}
            placeholder='Даваааай ебааааш'
            fullWidth
            inputProps={{
              maxLength: KEY_SIZE,
            }}
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
        </Box>
        <Button variant='contained' onClick={onTaskCalled}>
          Нажимать сюда
        </Button>
      </Box>
      <Markdown className={classes.markdown}>{output}</Markdown>
    </Box>
  );
};

export default Task9;

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body1,
  },
  inputBin: {
    caretColor: 'gray',
  },
}));
