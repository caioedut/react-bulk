import React, { createContext, useContext, useEffect, useRef } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, FormContext, FormField, FormProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

const Context = createContext<FormContext>(null as any);

export const useForm = () => useContext<FormContext>(Context);

function FormFactory({ stylist, map, ...props }: FactoryProps & FormProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Form;
  const { Form } = map;

  const formRef: any = useRef(null);
  const defaultRef = useRef(null);
  ref = ref || defaultRef;
  ref.current = ref.current || { fields: [] };

  // Extends from default props
  let {
    data,
    // Events
    onSubmit,
    onCancel,
    onClear,
    ...rest
  } = factory(props, options.defaultProps);

  const getField = (name) => {
    return ref.current.fields.find((item) => item?.name === name);
  };

  const setField = ({ name, get, set }: FormField) => {
    const field = getField(name);

    if (field) {
      Object.getOwnPropertyNames(field).forEach((prop) => delete field[prop]);
      Object.assign(field, { name, get, set });
    } else {
      ref.current.fields.push({ name, get, set });
    }
  };

  const unsetField = (name) => {
    const index = ref.current.fields.findIndex((item) => item?.name === name);

    if (index !== -1) {
      ref.current.fields.splice(index, 1);
    }
  };

  const getData = () => {
    const data = {};

    ref.current.fields.forEach(({ name, get }) => (data[name] = get()));

    return data;
  };

  const setData = (data: any = {}) => {
    Object.keys(Object(data)).forEach((attr) => getField(attr)?.set?.(data[attr]));
  };

  const submit = (e: any = undefined) => {
    e?.preventDefault?.();
    onSubmit?.(ref.current, getData());
  };

  const cancel = () => {
    onCancel?.(ref.current);
  };

  const clear = () => {
    const data = getData();
    ref.current.fields.forEach(({ set }) => set(''));
    onClear?.(ref.current, data);
  };

  Object.assign(ref.current, {
    submit,
    cancel,
    clear,
    getData,
    setData,
  });

  useEffect(() => {
    setData(Object(data));
  }, [data]);

  useEffect(() => {
    Object.assign(ref.current, { target: formRef?.current });
  }, [formRef]);

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  return (
    <Context.Provider
      value={{
        ...ref.current,
        getField,
        setField,
        unsetField,
      }}
    >
      <BoxFactory map={map} ref={formRef} component={Form} stylist={[styleRoot, stylist]} {...rest} onSubmit={submit} />
    </Context.Provider>
  );
}

export default React.forwardRef(FormFactory);
