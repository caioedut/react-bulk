import React, {
  ForwardedRef,
  ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { FormContext } from '../hooks/useForm';
import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import { FormField, FormProps, FormRef, RbkFormEvent } from '../types';
import dotObject from '../utils/dotObject';
import rbkGlobal from '../utils/global';
import BoxFactory from './BoxFactory';

const FormFactory = React.memo<FormProps>(
  forwardRef(({ ...props }, ref: ForwardedRef<FormRef>) => {
    const theme = useTheme();
    const options = theme.components.Form;
    const { web, Form } = rbkGlobal.mapping;

    // Extends from default props
    const {
      disableObjectParser,
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

    // Latest props, read when used so the form context stays stable across renders
    const propsRef = useRef({ disableObjectParser, initialData, onSubmit, onCancel, onReset, onClear, onChange });
    propsRef.current = { disableObjectParser, initialData, onSubmit, onCancel, onReset, onClear, onChange };

    if (web) {
      rest.noValidate = true;
    }

    const getField = useCallback(
      (name: string): FormField | undefined => {
        return fieldsRef.current.find((item) => item?.name === name);
      },
      [fieldsRef],
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

      return propsRef.current.disableObjectParser ? data : dotObject(data);
    }, [fieldsRef, propsRef]);

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

    const contextRef = useRef<FormRef>(null as any);

    const dispatchEvent = useCallback(
      (type: string, field?: FormField, nativeEvent?: any) => {
        const { onChange, onSubmit, onCancel, onReset, onClear } = propsRef.current;

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
          form: contextRef.current,
          target,
          nativeEvent,
        };

        if (type === 'change') {
          fieldsRef.current.forEach(({ onFormChange }) => onFormChange?.(event, data));
        }

        if (typeof callback === 'function') {
          callback(event, data, errors);
        }
      },
      [propsRef, rootRef, fieldsRef, contextRef, getData, getErrors],
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

    const submit = useCallback(
      (e?: any) => {
        e?.preventDefault?.();
        const nativeEvent = e?.nativeEvent ?? e;
        dispatchEvent('submit', undefined, nativeEvent);
      },
      [dispatchEvent],
    );

    const cancel = useCallback(
      (e?: any) => {
        e?.preventDefault?.();
        const nativeEvent = e?.nativeEvent ?? e;
        dispatchEvent('cancel', undefined, nativeEvent);
      },
      [dispatchEvent],
    );

    const reset = useCallback(
      (e?: any) => {
        e?.preventDefault?.();
        const nativeEvent = e?.nativeEvent ?? e;

        fieldsRef.current.forEach(({ set, initialValue }) => set(initialValue ?? null));
        setErrors(null);

        dispatchEvent('reset', undefined, nativeEvent);
      },
      [fieldsRef, setErrors, dispatchEvent],
    );

    const clear = useCallback(
      (e?: any) => {
        e?.preventDefault?.();
        const nativeEvent = e?.nativeEvent ?? e;

        fieldsRef.current.forEach(({ set }) => set(null));
        setErrors(null);

        dispatchEvent('clear', undefined, nativeEvent);
      },
      [fieldsRef, setErrors, dispatchEvent],
    );

    const context: FormRef = useMemo(
      () => ({
        get initialData() {
          return propsRef.current.initialData;
        },
        get target() {
          return rootRef.current as any;
        },
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
      }),
      [
        propsRef,
        rootRef,
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

    contextRef.current = context;

    useImperativeHandle(ref, () => context, [context]);

    return (
      <FormContext.Provider value={context}>
        <BoxFactory ref={rootRef} component={Form} variants={{ root: variants.root }} {...rest} onSubmit={submit} />
      </FormContext.Provider>
    );
  }),
);

FormFactory.displayName = 'FormFactory';

export default FormFactory;
