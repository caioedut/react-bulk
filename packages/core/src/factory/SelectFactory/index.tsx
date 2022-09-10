import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import factory from '../../props/factory';
import { spacings } from '../../styles/jss';
import { FactoryProps, SelectProps } from '../../types';
import useHtmlId from '../../useHtmlId';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';
import ButtonFactory from '../ButtonFactory';
import DropdownFactory from '../DropdownFactory';
import { useForm } from '../FormFactory';
import LabelFactory from '../LabelFactory';
import TextFactory from '../TextFactory';

function SelectFactory({ stylist, map, ...props }: FactoryProps & SelectProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Select;
  const { web, Input } = map;

  // Extends from default props
  let {
    defaultValue,
    id,
    label,
    name,
    onChange,
    options: arrOptions,
    placeholder,
    readOnly,
    value,

    buttonStyle,
    labelStyle,
    style,
    ...rest
  } = factory(props, options.defaultProps);

  id = useHtmlId(id);

  const form = useForm();
  const defaultRef: any = useRef(null);
  const buttonRef = ref || defaultRef;

  const [visible, setVisible] = useState(false);
  const [internal, setInternal] = useState(arrOptions?.find((item) => item.value == defaultValue));

  useEffect(() => {
    if (typeof value !== 'undefined') {
      setInternal(arrOptions?.find((item) => item.value == value));
    }
  }, [value]);

  useEffect(() => {
    if (!name || !form) return;

    form.setField({
      name,
      set: setInternal,
      get: () => internal?.value,
    });

    return () => form.unsetField(name);
  }, [name, form, internal]);

  const focus = useCallback(() => {
    buttonRef?.current?.focus?.();
  }, [buttonRef]);

  const blur = useCallback(() => {
    buttonRef?.current?.blur?.();
  }, [buttonRef]);

  const clear = useCallback(() => {
    setInternal(arrOptions?.find((item) => item.value == defaultValue));
  }, []);

  const isFocused = useCallback(() => {
    return buttonRef?.current?.isFocused?.() || buttonRef?.current === document?.activeElement;
  }, [buttonRef]);

  const handleChange = (e, option) => {
    const target = buttonRef?.current;
    const nativeEvent = e?.nativeEvent ?? e;
    const value = option.value;

    setVisible(false);
    setInternal(arrOptions?.find((item) => item.value == value));

    onChange?.({ target, value, focus, blur, clear, isFocused, nativeEvent }, value, option);
  };

  const handleChangeNative = (e) => {
    const option = arrOptions.find((item) => item.value == e.target.value);
    handleChange(e, option);
  };

  const styleRoot = useStylist({
    name: arrOptions.name,
    style: options.defaultStyles.root,
  });

  const styleState = useStylist({
    style: extract(spacings, rest),
  });

  return (
    <BoxFactory map={map} style={style} stylist={[styleRoot, styleState, stylist]}>
      {Boolean(label) && (
        <LabelFactory map={map} numberOfLines={1} for={buttonRef} style={[{ mx: 1, mb: 1 }, labelStyle]}>
          {label}
        </LabelFactory>
      )}

      <ButtonFactory
        ref={buttonRef}
        map={map}
        style={buttonStyle}
        block
        endIcon={visible ? 'CaretUp' : 'CaretDown'}
        {...rest}
        id={id}
        variant="outline"
        contentStyle={{ flex: 1 }}
        onPress={() => setVisible((current) => (readOnly ? false : !current))}
      >
        <TextFactory map={map}>{internal?.label ?? internal?.value ?? placeholder ?? ''}</TextFactory>
      </ButtonFactory>

      {web && (
        <Input //
          hidden
          type="text"
          name={name}
          readOnly={readOnly}
          value={`${internal?.value ?? ''}`}
          onChange={handleChangeNative}
        />
      )}

      <DropdownFactory map={map} visible={visible} mt={0.5} p={1} w="100%">
        <BoxFactory map={map}>
          {arrOptions?.map((option) => (
            <ButtonFactory
              key={option.value}
              map={map}
              block
              variant="text"
              disabled={option.disabled}
              endIcon={option.value == internal?.value ? 'Check' : null}
              contentStyle={{ flex: 1 }}
              onPress={(e) => handleChange(e, option)}
            >
              <TextFactory map={map}>{option.label}</TextFactory>
            </ButtonFactory>
          ))}
        </BoxFactory>
      </DropdownFactory>
    </BoxFactory>
  );
}

export default React.forwardRef(SelectFactory);
