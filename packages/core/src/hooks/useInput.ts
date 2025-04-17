import { useCallback, useEffect, useMemo, useState } from 'react';

import { useForm } from '../factory/FormFactory';
import { AnyObject, RbkFormEvent } from '../types';

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
  const resolveValue = useCallback(
    (value): any => {
      const newValue = value === '' ? null : (value ?? null);
      return ['string', 'number'].includes(typeof newValue) ? mask(newValue) : newValue;
    },
    [mask],
  );

  const form = useForm();

  const [initialValue] = useState(value ?? defaultValue ?? form?.initialData?.[name!]);
  const [_internal, _setInternal] = useState<string | undefined>(initialValue);
  const [prevInternal, setPrevInternal] = useState<any>();
  const [error, setError] = useState(errorProp);

  const internal = useMemo(
    () => resolveValue(controlled ? value : _internal),
    [_internal, controlled, resolveValue, value],
  );

  const setInternal = useCallback(
    (value, event?: Event, ...rest: any[]) => {
      const newValue = resolveValue(value);

      if (newValue !== internal) {
        setPrevInternal(internal);
        _setInternal(newValue);
        onChange?.(event, newValue, ...rest);
      }
    },
    [resolveValue, internal, onChange],
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
      get: () => unmask(internal),
      set: setInternal,
      getError: () => error ?? null,
      setError,
      onFormChange,
      initialValue,
    });

    return () => {
      form.unsetField(name);
    };
  }, [name, form, error, internal, initialValue, setInternal, onFormChange, unmask]);

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
