import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useForm from '../hooks/useForm';
import { AnyObject, FormField, RbkFormEvent } from '../types';

export type UseInputProps<T> = {
  prop?: string;
  name?: string;
  value?: T;
  defaultValue?: T;
  controlled?: boolean;
  editable?: boolean;
  error?: string | boolean | null | undefined;
  mask?: (value: T) => string;
  unmask?: (value: T) => T;
  onChange?: (event: any, value: T, ...rest: any[]) => void;
  onFormChange?: (event: RbkFormEvent, data: AnyObject) => void;
  // getError?: (value: T) => string | false | null | undefined | void;
};

export default function useInput<T>({
  prop = 'value',
  name,
  value,
  defaultValue,
  controlled,
  editable = true,
  error: errorProp,
  mask = (value) => `${value ?? ''}`,
  unmask = (value) => value,
  onChange,
  onFormChange,
}: UseInputProps<T>) {
  const resolveValue = useCallback((value) => {
    return value === '' ? null : (value ?? null);
  }, []);

  const form = useForm();

  const [initialValue] = useState(value ?? defaultValue ?? form?.initialData?.[name!]);
  const [_internal, _setInternal] = useState<string | undefined>(initialValue);
  const [prevInternal, setPrevInternal] = useState<any>();
  const [error, setError] = useState(errorProp);

  const internal = useMemo(
    () => resolveValue(controlled ? value : _internal),
    [_internal, controlled, resolveValue, value],
  );

  // Latest value, updated before onChange so form.getData() inside handlers is not one change behind
  const internalRef = useRef(internal);
  internalRef.current = internal;

  const setInternal = useCallback(
    (value, event?: Event, ...rest: any[]) => {
      const newValue = resolveValue(value);
      const current = internalRef.current;

      if (newValue !== current) {
        internalRef.current = newValue;
        setPrevInternal(current);
        _setInternal(newValue);
        onChange?.(event, newValue, ...rest);
      }
    },
    [resolveValue, onChange],
  );

  useMemo(() => {
    if (typeof value === 'undefined') return;

    _setInternal((current) => {
      setPrevInternal(current);
      return resolveValue(value);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useMemo(() => {
    setError(errorProp);
  }, [errorProp]);

  // Read through a ref, so the field is registered once per name and keeps its position in the form
  const fieldRef = useRef({ error, setInternal, onFormChange, unmask });
  fieldRef.current = { error, setInternal, onFormChange, unmask };

  const createField = useCallback(
    (): FormField => ({
      name: name!,
      get: () => fieldRef.current.unmask(internalRef.current as T) as any,
      set: (value) => fieldRef.current.setInternal(value),
      getError: () => fieldRef.current.error ?? null,
      setError,
      onFormChange: (event, data) => fieldRef.current.onFormChange?.(event, data),
      initialValue,
    }),
    [name, initialValue],
  );

  useEffect(() => {
    if (!name || !form) return;

    form.setField(createField());

    return () => {
      form.unsetField(name);
    };
  }, [name, form, createField]);

  // Let the form know the value changed (dispatches its onChange)
  useEffect(() => {
    if (!name || !form) return;

    form.setField(createField());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internal]);

  const reset = useCallback(() => {
    internalRef.current = resolveValue(initialValue);
    _setInternal(initialValue);
  }, [initialValue, resolveValue]);

  const clear = useCallback(() => {
    internalRef.current = null;
    _setInternal(undefined);
  }, []);

  const handleChange = useCallback(
    (event) => {
      if (!editable) return;

      let value = event?.target?.value ?? event?.nativeEvent?.text;

      if (prop !== 'value') {
        value = event?.target?.[prop] ?? event?.nativeEvent?.[prop];
      }

      setInternal(value, event);
    },
    [prop, editable, setInternal],
  );

  return useMemo(
    () => ({
      state: internal,
      setState: setInternal,
      prevState: prevInternal,
      error: error || null,
      clear,
      reset,
      form,
      props: {
        name,
        value: mask(internal ?? ''),
        onChange: handleChange,
      },
    }),
    [internal, setInternal, prevInternal, error, clear, reset, form, name, mask, handleChange],
  );
}
