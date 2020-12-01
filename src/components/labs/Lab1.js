import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import cn from 'classnames'
import { makeStyles } from '@material-ui/core/styles';
import { Box, OutlinedInput, Button } from '@material-ui/core';

import TextMask from '../TextMask';

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
  const [state, setState] = useState('');

  return (
    <Box display='flex' flexDirection='column'>
      <Markdown className={classes.task}>{task}</Markdown>
      <Box display='flex' flexDirection='column' alignItems='center' pb={6}>
        <TextMask
          className={classes.binaryInput}
          value={state}
          placeholder="Введите двоичное число"
          mask={new Array(8).fill('bbbb').join(' ')}
          definitions={{
            b: /[01]/,
          }}
          onAccept={setState}
        />
        <Box display='flex'>
          <OutlinedInput className={cn(classes.chooseBit, classes.flexItem)} placeholder='k-й бит' />
          <Button variant='contained' color='primary' className={classes.flexItem}>
            {'-->'}
          </Button>
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
  binaryInput: {
    alignSelf: 'center',
    caretColor: 'gray',
    width: '350px',
    marginBottom: theme.spacing(3),
  },
  chooseBit: {
    width: '80px',
  },
}));
