import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Line } from 'rc-progress';


import Markdown from '../../Markdown';

const KEY_SIZE = 64;
const IV_SIZE = 20;

const task = `
# SHACAL-2
    
Разработать приложение, шифрующее и дешифрующее файл с помощью алгоритма 
SHACAL.
`;

const TaskShacal = () => {
  const classes = useStyles();

  const [inputFile, setInputFile] = useState('');
  const [inputKey, setInputKey] = useState('');
  const [inputIV, setInputIV] = useState('');
  const [operation, setOperation] = useState('encrypt');
  const [mode, setMode] = useState('ecb');

  const [output, setOutput] = useState('');
  const [showDownload, setShowDownload] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const onTaskCalled = () => {
    if (!inputFile) {
      setOutput('Не указан файл');
      return false;
    }
    if (inputKey.length === 0) {
      setOutput('Не указан ключ');
      return false;
    }
    if (mode !== 'ecb' && inputIV.length === 0) {
      setOutput('Не указан вектор инициализации');
      return false;
    }

    console.log('Input size: ' + inputFile.size);

    const formData = new FormData();
    formData.append('file', inputFile);
    formData.append('key', inputKey);
    formData.append('operation', operation);
    formData.append('init_vector', inputIV);
    formData.append('mode', mode);

    if (mode === 'ecb') formData.append('init_vector', inputIV);

    const promise = axios
      .post('/course/shacal-2', formData)

    setShowProgress(true);
    const outputSize = (Math.floor(inputFile.size / 32) + 1) * 32
    
    const interval = setInterval(() => {
      axios.get('/course/get_file_size').then(res => {
        console.log(res.data / outputSize * 100);
        setProgress(res.data / outputSize * 100);
      });
    }, 500);
    
    promise
      .then((res) => {
        clearInterval(interval);
        setProgress(100);
        setOutput('Готово');
        setShowProgress(false);
        setProgress(0);
        setShowDownload(true);
      })
      .catch((err) => {
        console.error(err);
        setOutput('Поломалось');
      });
  };

  const onResultDownload = () => {
    axios
      .get('course/shacal-2')
      .then((res) => {
        console.log(res);
        // res.data = new TextEncoder().encode(res.data) //
        // console.log(typeof(res.data)); //
        const filename = operation + "ed_" + inputFile.name;
        const blob = new Blob([res.data]);
        // console.log("Data: " + res.data);
        // console.log("Data len: " + res.data.length);
        // blob.text().then(e => console.log("Blob: " + e));
        // blob.text().then(e => console.log("\Blob len: " + e.length));
        saveAs(blob, filename);
      })
      .catch((err) => {
        console.error(err);
        setOutput('Не качается');
      });
  };

  const onInputFileSelected = (e) => {
    if (e.target.files.length === 0)
      return;
    setInputFile(e.target.files[0]);
  }

  const onKeyLoadCalled = (e) => {
    if (e.target.files.length === 0)
      return;
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => setInputKey(fileReader.result.substr(0, 64));
    fileReader.readAsText(e.target.files[0]);
  };

  const onIVLoadCalled = (e) => {
    if (e.target.files.length === 0)
      return;
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => setInputIV(fileReader.result.substr(0, 20));
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box mb={3}>
        <Markdown className={classes.markdown}>{task}</Markdown>
      </Box>

      <Box mb={3} display='flex'>
        <label htmlFor='upload-data'>
          <input
            style={{ display: 'none' }}
            id='upload-data'
            name='upload-data'
            type='file'
            onChange={onInputFileSelected}
          />
          <Button variant='contained' component='span'>
            Что шифруем?
          </Button>
        </label>

        {inputFile && <Typography>{inputFile.name}</Typography>}
      </Box>

      <Box m={3}>
        <label htmlFor='upload-key'>
          <input
            style={{ display: 'none' }}
            id='upload-key'
            name='upload-key'
            type='file'
            onChange={onKeyLoadCalled}
          />
          <Button variant='contained' component='span'>
            Импорт ключа
          </Button>
        </label>
        <Box width={500}>
          <TextField
            className={classes.input}
            placeholder='Ключ'
            fullWidth
            inputProps={{
              maxLength: KEY_SIZE,
            }}
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
        </Box>
      </Box>

      <RadioGroup
        name='operation'
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
      >
        <FormControlLabel
          value='encrypt'
          control={<Radio />}
          label='Шифровать'
        />
        <FormControlLabel
          value='decrypt'
          control={<Radio />}
          label='Дешифровать'
        />
      </RadioGroup>

      {showProgress && <Line percent={progress} strokeWidth="5" strokeColor="#D3D3D3" />}

      <RadioGroup
        name='mode'
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <FormControlLabel value='ecb' control={<Radio />} label='ECB' />
        <FormControlLabel value='cbc' control={<Radio />} label='CBC' />
        <FormControlLabel value='cfb' control={<Radio />} label='CFB' />
        <FormControlLabel value='ofb' control={<Radio />} label='OFB' />
      </RadioGroup>

      {mode !== 'ecb' && (
        <Box m={3}>
          <label htmlFor='upload-iv'>
            <input
              style={{ display: 'none' }}
              id='upload-iv'
              name='upload-iv'
              type='file'
              onChange={onIVLoadCalled}
            />
            <Button variant='contained' component='span'>
              Импорт вектора
            </Button>
          </label>
          <Box width={180}>
            <TextField
              className={classes.input}
              placeholder='Вектор инициализации'
              fullWidth
              inputProps={{
                maxLength: IV_SIZE,
              }}
              value={inputIV}
              onChange={(e) => setInputIV(e.target.value)}
            />
          </Box>
        </Box>
      )}

      <Box mb={3}>
        <Button variant='contained' onClick={onTaskCalled}>
          {operation === 'encrypt' ? 'Шифровать' : 'Дешифровать'}
        </Button>
      </Box>
      {showDownload && (
        <Button variant='contained' onClick={onResultDownload}>
          Загрузить
        </Button>
      )}

      <Markdown className={classes.markdown}>{output}</Markdown>
    </Box>
  );
};

export default TaskShacal;

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body1,
  },
  inputBin: {
    caretColor: 'gray',
  },
}));
