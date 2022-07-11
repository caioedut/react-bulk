import React, { useState } from 'react';

import { useTheme } from '../../ReactBulk';
import { SelectProps } from '../../types';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import DropdownFactory from '../DropdownFactory';
import InputFactory from '../InputFactory';
import TextFactory from '../TextFactory';

function SelectFactory({ options, placeholder, label, size, name, value, onChange, style, map, ...rest }: SelectProps | any, ref: any) {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const selected = options.find((option) => option.value == value);

  style = [{ justifyContent: 'space-between' }, style];

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
    <>
      <ButtonFactory {...rest} block variant="outline" map={map} style={style} onPress={() => setVisible((current) => !current)}>
        <TextFactory map={map}>{selected?.label ?? selected?.value ?? placeholder}</TextFactory>
        <TextFactory map={map} size={0.625} color="primary">
          {visible ? '▲' : '▼'}
        </TextFactory>
      </ButtonFactory>
      <InputFactory ref={ref} type="hidden" name={name} value={value ?? ''} map={map} onChange={handleChange} />
      <DropdownFactory map={map} visible={visible} p={0} py={1} mt={0.5} w="100%">
        {options?.map((option) => (
          <BoxFactory
            key={option.value}
            map={map}
            px={3}
            py={2}
            onPress={(e) => handlePressOption(e, option)}
            style={{
              cursor: 'pointer',
              transition: `all ${theme.mixins.transition}`,
              '&:hover': {
                backgroundColor: theme.hex2rgba(theme.colors.primary.main, 0.1),
              },
            }}
          >
            <TextFactory map={map}>{option.label}</TextFactory>
          </BoxFactory>
        ))}
      </DropdownFactory>
    </>
  );
}

export default React.forwardRef(SelectFactory);
