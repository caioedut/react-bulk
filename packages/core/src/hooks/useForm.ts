import { createContext, useContext } from 'react';

import { FormRef } from '../types';

export const FormContext = createContext<FormRef>(null as any);

export default function useForm() {
  return useContext<FormRef>(FormContext);
}
