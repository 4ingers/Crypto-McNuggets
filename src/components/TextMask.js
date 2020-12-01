import React from 'react';
import { IMaskMixin } from 'react-imask';
import { OutlinedInput } from '@material-ui/core';

const TextMask = IMaskMixin((props) => <OutlinedInput {...props} />);

export default TextMask;
