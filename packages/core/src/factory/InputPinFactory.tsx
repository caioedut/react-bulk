import React, { forwardRef, useCallback } from 'react';

import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import getSize from '../props/getSize';
import { InputPinProps, RequiredSome } from '../types';
import rbkGlobal from '../utils/global';
import string from '../utils/string';
import InputFactory from './InputFactory';

const InputPinFactory = React.memo<InputPinProps>(
  forwardRef(({ ref, ...props }, legacyRef) => {
    ref = ref || legacyRef;

    const theme = useTheme();
    const options = theme.components.InputPin;
    const { web, ios } = rbkGlobal.mapping;

    // Extends from default props
    let {
      length,
      placeholder,
      size,
      type,
      // Styles
      variants,
      inputStyle,
      style,
      ...rest
    } = factory2<RequiredSome<InputPinProps, 'length'>>(props, options);

    size = getSize(size);

    const resolveValue = useCallback(
      (value) => {
        value = string(value).replace(/[^0-9a-zA-Z]/g, '');

        if (type === 'alphabetic') {
          value = value.replace(/[^a-zA-Z]/g, '');
        }

        if (type === 'numeric') {
          value = value.replace(/\D/g, '');
        }

        return value.slice(0, length);
      },
      [type, length],
    );

    inputStyle = [
      {
        fontFamily: web ? '"Courier New", monospace' : ios ? 'Courier New' : 'monospace',
        letterSpacing: theme.spacing(size),
      },
      inputStyle,
    ];

    return (
      <InputFactory
        ref={ref}
        style={style}
        variants={variants}
        {...rest}
        size={size}
        mask={resolveValue}
        unmask={resolveValue}
        placeholder={''.padEnd(length, placeholder ?? '_')}
        inputStyle={inputStyle}
      />
    );
  }),
);

InputPinFactory.displayName = 'InputPinFactory';

export default InputPinFactory;
