import React, {
  ForwardedRef,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { FormField, FormProps, FormRef, RbkFormEvent } from '../../types';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';

const Context = createContext<FormRef>(null as any);

export const useForm = () => useContext<FormRef>(Context);

const FormFactory = React.memo<FormProps>(
  forwardRef(({ stylist, ...props }, ref: ForwardedRef<FormRef>) => {
    const theme = useTheme();
    const options = theme.components.Form;
    const { web, Form } = global.mapping;

    // Extends from default props
    let {
      data,
      // Events
      onSubmit,
      onCancel,
      onClear,
      onChange,
      // Styles
      variants,
      ...rest
    } = factory2(props, options);

    const defaultRef = useRef(null);
    const formRef = useRef<ReactNode>(null);
    const fieldsRef = useRef<FormField[]>([]);
    const dataRef = useRef<any>({});

    ref = ref || defaultRef;

    if (web) {
      rest.noValidate = true;
    }

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
      // @ts-ignore
      Object.assign(ref?.current, { target: formRef.current });
    }, [formRef]);

    function dispatchEvent(type: string, field?: FormField, nativeEvent?: any) {
      const callback = {
        change: onChange,
        submit: onSubmit,
      }[type];

      // onSubmit?.(ref?.current, getData());

      const target = formRef.current;
      const data = getData();

      const event: RbkFormEvent = {
        type,
        name: field?.name,
        target,
        form: context,
        nativeEvent,
      };

      if (typeof callback === 'function') {
        callback(event, data);
      }

      fieldsRef.current.forEach(({ onFormChange }) => onFormChange?.(event, data));
    }

    function getField(name: string): FormField | undefined {
      return fieldsRef.current.find((item) => item?.name === name);
    }

    function setField(options: FormField) {
      const { name } = options;
      let field = getField(name);

      if (field) {
        Object.getOwnPropertyNames(field).forEach((prop) => delete field?.[prop]);
        Object.assign(field, options);
      } else {
        field = options;
        fieldsRef.current.push(options);
      }

      const newValue = field.get();

      if (dataRef.current[name] !== newValue) {
        dataRef.current[name] = newValue;
        dispatchEvent('change', field);
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
      const nativeEvent = e?.nativeEvent ?? e;
      dispatchEvent('submit', undefined, nativeEvent);
    }

    function cancel() {
      // @ts-ignore
      onCancel?.(ref?.current);
    }

    function clear() {
      const data = getData();
      fieldsRef.current.forEach(({ set }) => set(''));
      // @ts-ignore
      onClear?.(ref?.current, data);
    }

    return (
      <Context.Provider value={context}>
        <BoxFactory ref={formRef} component={Form} stylist={[variants.root, stylist]} {...rest} onSubmit={submit} />
      </Context.Provider>
    );
  }),
);

FormFactory.displayName = 'FormFactory';

export default FormFactory;
