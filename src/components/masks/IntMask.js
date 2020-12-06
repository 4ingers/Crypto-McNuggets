import React from 'react';
import TextMask from './TextMask';

const SIZE = 32

const IntMask = (props) => {
  const size = parseInt((props.size || SIZE), 10)
  const max = 2**size - 1;

  const defaultProps = {
    placeholder: (props.out && 'Результат') || 'Вводите цифры..',
    mask: Number,
    unmask: 'typed',
    min: 0,
    max,
    scale: 0,
    fullWidth: true,
    InputProps: {
      readOnly: props.out === 'true',
    },
  };
  return <TextMask {...defaultProps} {...props} />;
};

export default IntMask;
