import React, { createContext, useContext, useEffect, useRef } from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { FactoryProps, FormProps } from '../../types';
import BoxFactory from '../BoxFactory';

const Context = createContext(null);

export const useForm: any = () => useContext(Context);

function FormFactory({ data, onSubmit, className, map, ...props }: FactoryProps & FormProps, ref: any) {
  const theme = useTheme();
  const { Form } = map;

  const formRef: any = useRef(null);
  const defaultRef = useRef(null);
  ref = ref || defaultRef;

  // Extends from default props
  props = { ...theme.components.Form.defaultProps, ...props };

  let { ...rest } = props;

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

  const getData = () => {
    const data = {};

    ref.current.fields.forEach(({ name, get }) => (data[name] = get()));

    return data;
  };

  const setData = (data: any = {}) => {
    Object.keys(data).forEach((attr) => getField(attr)?.set?.(data[attr]));
  };

  useEffect(() => {
    ref.current = {
      target: formRef?.current,
      submit: handleSubmit,
      getData,
      setData,
      getField,
      setField,
      fields: [] as any,
    };
  }, [formRef]);

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e, getData());
  };

  const styleRoot = createStyle({
    className: 'rbk-form',
    style: {
      margin: 0,
      padding: 0,
    },
  });

  const styles = [styleRoot, className];

  return (
    <Context.Provider value={ref?.current}>
      <BoxFactory map={map} ref={formRef} component={Form} {...rest} onSubmit={handleSubmit} className={styles} />
    </Context.Provider>
  );
}

export default React.forwardRef(FormFactory);
