import { ButtonProps } from '@react-bulk/core';

export type WebButtonProps = ButtonProps & {
  type?: 'button' | 'reset' | 'submit';
};
