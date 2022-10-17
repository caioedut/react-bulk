import React, { ReactNode, createContext, useContext, useEffect, useImperativeHandle, useRef } from 'react';

import { useTheme } from '../../ReactBulk';
import factory2 from '../../props/factory2';
import { FactoryProps, FormField, FormProps, FormRef } from '../../types';
import BoxFactory from '../BoxFactory';

const Context = createContext<FormRef>(null as any);

export const useForm = () => useContext<FormRef>(Context);

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
    // Styles
    variants,
    ...rest
  } = factory2(props, options, theme);

  const defaultRef = useRef(null);
  const formRef = useRef<ReactNode>(null);
  const fieldsRef = useRef<FormField[]>([]);

  ref = (ref || defaultRef) as FormRef;

  const context = {
    submit,
    cancel,
    clear,
    getData,
    setData,
    getValue,
    setValue,
    getField,
    setField,
    unsetField,
    target: formRef.current,
  };

  useImperativeHandle(ref, () => context, [context]);

  useEffect(() => {
    setData(Object(data));
  }, [data]);

  useEffect(() => {
    Object.assign(ref.current, { target: formRef.current });
  }, [formRef]);

  function getField(name: string) {
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

  function unsetField(name: string) {
    const index = fieldsRef.current.findIndex((item) => item?.name === name);

    if (index !== -1) {
      fieldsRef.current.splice(index, 1);
    }
  }

  function getValue(name: string): any {
    return getField(name)?.get?.();
  }

  function setValue(name: string, value: any) {
    return getField(name)?.set?.(value);
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

  return (
    <Context.Provider value={context}>
      <BoxFactory map={map} ref={formRef} component={Form} stylist={[variants.root, stylist]} {...rest} onSubmit={submit} />
    </Context.Provider>
  );
}

export default React.forwardRef(FormFactory);
