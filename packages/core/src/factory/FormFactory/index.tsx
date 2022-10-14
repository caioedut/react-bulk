import React, { ReactNode, createContext, useContext, useEffect, useImperativeHandle, useRef } from 'react';

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

  // Extends from default props
  let {
    data,
    // Events
    onSubmit,
    onCancel,
    onClear,
    ...rest
  } = factory(props, options.defaultProps);

  const formRef = useRef<ReactNode>(null);
  const fieldsRef = useRef<FormField[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      submit,
      cancel,
      clear,
      getData,
      setData,
      target: formRef.current,
      fields: fieldsRef.current,
    }),
    [submit, cancel, clear, getData, setData],
  );

  useEffect(() => {
    setData(Object(data));
  }, [data]);

  function getField(name) {
    return fieldsRef.current.find((item) => item?.name === name);
  }

  function setField({ name, get, set }: FormField) {
    const field = getField(name);

    if (field) {
      Object.getOwnPropertyNames(field).forEach((prop) => delete field[prop]);
      Object.assign(field, { name, get, set });
    } else {
      fieldsRef.current.push({ name, get, set });
    }
  }

  function unsetField(name) {
    const index = fieldsRef.current.findIndex((item) => item?.name === name);

    if (index !== -1) {
      fieldsRef.current.splice(index, 1);
    }
  }

  function getData() {
    const data = {};

    fieldsRef.current.forEach(({ name, get }) => (data[name] = get()));

    return data;
  }

  function setData(data: any = {}) {
    Object.keys(Object(data)).forEach((attr) => getField(attr)?.set?.(data[attr]));
  }

  function submit(e: any = undefined) {
    e?.preventDefault?.();
    onSubmit?.(ref.current, getData());
  }

  function cancel() {
    onCancel?.(ref.current);
  }

  function clear() {
    const data = getData();
    fieldsRef.current.forEach(({ set }) => set(''));
    onClear?.(ref.current, data);
  }

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
