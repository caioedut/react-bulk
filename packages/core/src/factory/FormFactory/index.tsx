import React, { createContext, useContext, useEffect, useRef } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, FormProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

const Context = createContext(null);

export const useForm: any = () => useContext(Context);

function FormFactory({ data, onSubmit, stylist, map, ...props }: FactoryProps & FormProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Form;
  const { Form } = map;

  const formRef: any = useRef(null);
  const defaultRef = useRef(null);
  ref = ref || defaultRef;

  // Extends from default props
  let { ...rest } = factory(props, options.defaultProps);

  const getField = (name) => {
    return ref.current.fields.find((item) => item?.name === name);
  };

  const setField = ({ name, get, set }) => {
    const field = getField(name);

    if (field) {
      Object.assign(field, { get, set });
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
    Object.keys(data).forEach((attr) => getField(attr)?.set?.(data[attr]));
  };

  const clear = () => {
    ref.current.fields.forEach(({ set }) => set(''));
  };

  useEffect(() => {
    ref.current = {
      target: formRef?.current,
      submit: handleSubmit,
      getData,
      setData,
      getField,
      setField,
      unsetField,
      clear,
      fields: [] as any,
    };
  }, [formRef]);

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    onSubmit?.(e, getData());
  };

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  stylist = [styleRoot, stylist];

  return (
    <Context.Provider value={ref?.current}>
      <BoxFactory map={map} ref={formRef} component={Form} stylist={stylist} {...rest} onSubmit={handleSubmit} />
    </Context.Provider>
  );
}

export default React.forwardRef(FormFactory);
