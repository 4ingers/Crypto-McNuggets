import React from 'react';
import TextMask from './TextMask';

const BITS_LENGTH = 32;

const BinaryMask = (props) => {
  const bits = 'b'.repeat(props.length || BITS_LENGTH);
  const mask = bits.match(/.{1,4}/g).join(' ');

  const placeholder =
    (props.out && 'Результат') || `Вводите нулики и единички (${props.length})`;

  const readonly = {
    InputProps: {
      readOnly: props.out === 'true',
    }
  }

  const defaultProps = {
    placeholder,
    mask,
    definitions: { b: /[01]/ },
    // variant: 'filled',
    fullWidth: true,
    ...readonly,
  };

  return <TextMask {...defaultProps} {...props} />;
};

export default BinaryMask;
