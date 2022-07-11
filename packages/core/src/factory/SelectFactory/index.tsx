import React, { useState } from 'react';

import { spacings } from '../../styles/jss';
import { SelectProps } from '../../types';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import DropdownFactory from '../DropdownFactory';
import InputFactory from '../InputFactory';
import TextFactory from '../TextFactory';

function SelectFactory(
  { options, placeholder, label, name, value, onChange, style, containerStyle, map, ...rest }: SelectProps | any,
  ref: any,
) {
  const [visible, setVisible] = useState(false);
  const selected = options.find((option) => option.value == value);

  containerStyle = [
    ...spacings
      .filter((attr) => attr in rest)
      .map((attr) => {
        const val = rest[attr];
        delete rest[attr];
        return { [attr]: val };
      }),
    containerStyle,
  ];

  const handlePressOption = (e, option) => {
    setVisible(false);

    if (typeof onChange === 'function') {
      onChange(e, option.value, option);
    }
  };

  const handleChange = (e) => {
    const option = options.find((option) => option.value == value);
    handlePressOption(e, option);
  };

  return (
    <BoxFactory map={map} style={containerStyle}>
      {Boolean(label) && (
        <TextFactory map={map} mb={1} numberOfLines={1}>
          {label}
        </TextFactory>
      )}
      <ButtonFactory
        map={map}
        {...rest}
        block
        wrap={false}
        type="button"
        variant="outline"
        style={style}
        onPress={() => setVisible((current) => !current)}
      >
        <TextFactory map={map} flex style={{ textAlign: 'left' }}>
          {selected?.label ?? selected?.value ?? placeholder ?? ''}
        </TextFactory>
        <TextFactory map={map} size={0.625} color="primary">
          {visible ? '▲' : '▼'}
        </TextFactory>
      </ButtonFactory>
      <InputFactory map={map} ref={ref} type="hidden" name={name} value={value ?? ''} onChange={handleChange} />
      <DropdownFactory map={map} visible={visible} p={1} mt={0.5} w="100%">
        {options?.map((option) => (
          <ButtonFactory
            key={option.value}
            map={map}
            block
            wrap={false}
            type="button"
            variant="text"
            disabled={option.disabled}
            onPress={(e) => handlePressOption(e, option)}
          >
            <TextFactory map={map} flex style={{ textAlign: 'left' }}>
              {option.label}
            </TextFactory>
            {option.value == selected?.value && (
              <TextFactory map={map} color="primary">
                ✓
              </TextFactory>
            )}
          </ButtonFactory>
        ))}
      </DropdownFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(SelectFactory);
