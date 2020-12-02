import React from 'react';
import { IMaskMixin } from 'react-imask';
import { TextField } from '@material-ui/core';

const TextMask = IMaskMixin((props) => <TextField {...props} />);

export default TextMask;
