import React, {
  ForwardedRef,
  ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import { FormField, FormProps, FormRef, RbkFormEvent } from '../types';
import global from '../utils/global';
import BoxFactory from './BoxFactory';

const Context = createContext<FormRef>(null as any);

export const useForm = () => useContext<FormRef>(Context);

const FormFactory = React.memo<FormProps>(
  forwardRef(({ ...props }, ref: ForwardedRef<FormRef>) => {
    const theme = useTheme();
    const options = theme.components.Form;
    const { web, Form } = global.mapping;

    // Extends from default props
    const {
      initialData,
      // Events
      onSubmit,
      onCancel,
      onReset,
      onClear,
      onChange,
      // Styles
      variants,
      ...rest
    } = factory2<FormProps>(props, options);

    const rootRef = useRef<ReactNode>(null);
    const fieldsRef = useRef<FormField[]>([]);
    const dataRef = useRef<any>({});

    if (web) {
      rest.noValidate = true;
    }

    const getField = useCallback(
      (name: string): FormField | undefined => {
        return fieldsRef.current.find((item) => item?.name === name);
      },
      [fieldsRef],
    );

    const setField = useCallback(
      (options: FormField) => {
        const { name } = options;
        let field = getField(name);

        if (field) {
          Object.keys(field).forEach((prop) => delete field?.[prop]);
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
      },
      [dataRef, fieldsRef, getField, dispatchEvent],
    );

    const unsetField = useCallback(
      (name: string) => {
        fieldsRef.current = fieldsRef.current.filter((item) => item?.name !== name);
      },
      [fieldsRef],
    );

    const getValue = useCallback((name: string): any => getField(name)?.get?.(), [getField]);

    const setValue = useCallback((name: string, value: any) => getField(name)?.set?.(value), [getField]);

    const getData = useCallback(() => {
      const data = {};

      fieldsRef.current.forEach(({ name, get }) => (data[name] = get()));

      return data;
    }, [fieldsRef]);

    const setData = useCallback(
      (data: any = {}) => {
        Object.keys(Object(data)).forEach((attr) => {
          const field = getField(attr);

          if (field) {
            const value = data[attr];

            if (value !== field.get()) {
              field.set(value);
            }
          }
        });
      },
      [getField],
    );

    const getErrors = useCallback(() => {
      const errors = {};

      fieldsRef.current.forEach((item) => {
        const message = item?.getError?.();

        if (message) {
          errors[item.name] = message;
        }
      });

      return Object.keys(errors).length ? errors : null;
    }, [fieldsRef]);

    const setErrors = useCallback(
      (errors: FormProps['errors']) => {
        fieldsRef.current.forEach((item) => {
          item?.setError?.(errors?.[item.name] ?? false);
        });
      },
      [fieldsRef],
    );

    function dispatchEvent(type: string, field?: FormField, nativeEvent?: any) {
      const callback = {
        change: onChange,
        submit: onSubmit,
        cancel: onCancel,
        reset: onReset,
        clear: onClear,
      }[type];

      const target = rootRef.current;
      const data = getData();
      const errors = getErrors();

      const event: RbkFormEvent = {
        type,
        name: field?.name,
        form: context,
        target,
        nativeEvent,
      };

      if (type === 'change') {
        fieldsRef.current.forEach(({ onFormChange }) => onFormChange?.(event, data));
      }

      if (typeof callback === 'function') {
        callback(event, data, errors);
      }
    }

    function submit(e?: any) {
      e?.preventDefault?.();
      const nativeEvent = e?.nativeEvent ?? e;
      dispatchEvent('submit', undefined, nativeEvent);
    }

    function cancel(e?: any) {
      e?.preventDefault?.();
      const nativeEvent = e?.nativeEvent ?? e;
      dispatchEvent('cancel', undefined, nativeEvent);
    }

    function reset(e?: any) {
      e?.preventDefault?.();
      const nativeEvent = e?.nativeEvent ?? e;

      fieldsRef.current.forEach(({ set, initialValue }) => set(initialValue ?? null));
      setErrors(null);

      dispatchEvent('reset', undefined, nativeEvent);
    }

    function clear(e?: any) {
      e?.preventDefault?.();
      const nativeEvent = e?.nativeEvent ?? e;

      fieldsRef.current.forEach(({ set }) => set(null));
      setErrors(null);

      dispatchEvent('clear', undefined, nativeEvent);
    }

    const context: FormRef = useMemo(
      () => ({
        initialData,
        submit,
        cancel,
        reset,
        clear,
        getData,
        setData,
        getErrors,
        setErrors,
        getValue,
        setValue,
        getField,
        setField,
        unsetField,
        target: rootRef.current,
      }),
      [
        rootRef.current,
        initialData,
        submit,
        cancel,
        reset,
        clear,
        getData,
        getErrors,
        getField,
        getValue,
        setData,
        setErrors,
        setField,
        setValue,
        unsetField,
      ],
    );

    useImperativeHandle(ref, () => context, [context]);

    useEffect(() => {
      // @ts-ignore
      Object.assign(ref?.current || {}, { target: rootRef.current });
    }, [ref, rootRef]);

    return (
      <Context.Provider value={context}>
        <BoxFactory ref={rootRef} component={Form} variants={{ root: variants.root }} {...rest} onSubmit={submit} />
      </Context.Provider>
    );
  }),
);

FormFactory.displayName = 'FormFactory';

export default FormFactory;
