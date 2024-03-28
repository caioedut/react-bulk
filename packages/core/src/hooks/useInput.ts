import { useCallback, useEffect, useMemo, useState } from 'react';

import { useForm } from '../factory/FormFactory';
import { AnyObject, RbkFormEvent } from '../types';

export type UseInputProps<T> = {
  prop?: string;
  name?: string;
  value?: T;
  defaultValue?: T;
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
  editable = true,
  error: errorProp,
  mask,
  unmask,
  onChange,
  onFormChange,
}: UseInputProps<T>) {
  const resolveValue = useCallback(
    (value) => {
      if (unmask) {
        value = unmask(value);
      }

      if (value === '') {
        value = null;
      }

      return value ?? null;
    },
    [unmask],
  );

  const form = useForm();

  const [initialValue] = useState(resolveValue(value ?? defaultValue));
  const [internal, _setInternal] = useState(initialValue);
  const [prevInternal, setPrevInternal] = useState();
  const [error, setError] = useState(errorProp);

  const setInternal = useCallback(
    (value, event?: Event, ...rest: any[]) => {
      const newValue = resolveValue(value);

      if (newValue !== internal) {
        setPrevInternal(internal);
        _setInternal(newValue);
        onChange?.(event, newValue, ...rest);
      }
    },
    [internal, onChange, resolveValue],
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

  useEffect(() => {
    if (!name || !form) return;

    form.setField({
      name,
      get: () => internal,
      set: setInternal,
      getError: () => error ?? null,
      setError,
      onFormChange,
    });

    return () => {
      form.unsetField(name);
    };
  }, [name, form, error, internal, setInternal, onFormChange]);

  const reset = useCallback(() => {
    _setInternal(initialValue);
  }, [initialValue]);

  const clear = useCallback(() => {
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

  return useMemo(() => {
    return {
      state: internal,
      setState: setInternal,
      prevState: prevInternal,
      error: error || null,
      clear,
      reset,
      form,
      props: {
        name,
        value: `${(typeof mask === 'function' ? mask(internal) : internal) ?? ''}`,
        onChange: handleChange,
      },
    };
  }, [internal, setInternal, prevInternal, error, clear, reset, name, mask, form, handleChange]);
}
