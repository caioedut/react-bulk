import { ForwardRefExoticComponent, forwardRef } from 'react';

import {
  AnimationFactory,
  AnimationProps,
  BackdropFactory,
  BackdropProps,
  BadgeFactory,
  BadgeProps,
  BoxFactory,
  BoxProps,
  ButtonFactory,
  ButtonGroupFactory,
  ButtonGroupProps,
  ButtonProps,
  CardFactory,
  CardProps,
  CheckboxFactory,
  CheckboxProps,
  DividerFactory,
  DividerProps,
  DropdownFactory,
  DropdownProps,
  FormFactory,
  FormProps,
  GridFactory,
  GridProps,
  InputFactory,
  InputProps,
  LabelFactory,
  LabelProps,
  LinkFactory,
  LinkProps,
  ListItemFactory,
  ListItemProps,
  LoadingFactory,
  LoadingProps,
  ModalFactory,
  ModalProps,
  ProgressFactory,
  ProgressProps,
  SelectFactory,
  SelectProps,
  TableFactory,
  TableProps,
  TextFactory,
  TextProps,
  TooltipFactory,
  TooltipProps,
} from '@react-bulk/core';

import useMap from './useMap';

export { default as Collapse } from './Collapse';
export { default as Image } from './Image';
export { default as Scrollable } from './Scrollable';

export const Backdrop: ForwardRefExoticComponent<BackdropProps> = forwardRef((props, ref) => (
  <BackdropFactory ref={ref} {...props} map={useMap()} />
));

export const Badge: ForwardRefExoticComponent<BadgeProps> = forwardRef((props, ref) => (
  <BadgeFactory ref={ref} {...props} map={useMap()} />
));

export const Box: ForwardRefExoticComponent<BoxProps> = forwardRef((props, ref) => <BoxFactory ref={ref} {...props} map={useMap()} />);

export const Button: ForwardRefExoticComponent<ButtonProps> = forwardRef((props, ref) => (
  <ButtonFactory ref={ref} {...props} map={useMap()} />
));

export const ButtonGroup: ForwardRefExoticComponent<ButtonGroupProps> = forwardRef((props, ref) => (
  <ButtonGroupFactory ref={ref} {...props} map={useMap()} />
));

export const Card: ForwardRefExoticComponent<CardProps> = forwardRef((props, ref) => <CardFactory ref={ref} {...props} map={useMap()} />);

export const Checkbox: ForwardRefExoticComponent<CheckboxProps> = forwardRef((props, ref) => (
  <CheckboxFactory ref={ref} {...props} map={useMap()} />
));

export const Divider: ForwardRefExoticComponent<DividerProps> = forwardRef((props, ref) => (
  <DividerFactory ref={ref} {...props} map={useMap()} />
));

export const Dropdown: ForwardRefExoticComponent<DropdownProps> = forwardRef((props, ref) => (
  <DropdownFactory ref={ref} {...props} map={useMap()} />
));

export const Form: ForwardRefExoticComponent<FormProps> = forwardRef((props, ref) => <FormFactory ref={ref} {...props} map={useMap()} />);

export const Grid: ForwardRefExoticComponent<GridProps> = forwardRef((props, ref) => <GridFactory ref={ref} {...props} map={useMap()} />);

export const Input: ForwardRefExoticComponent<InputProps> = forwardRef((props, ref) => (
  <InputFactory ref={ref} {...props} map={useMap()} />
));

export const Label: ForwardRefExoticComponent<LabelProps> = forwardRef((props, ref) => (
  <LabelFactory ref={ref} {...props} map={useMap()} />
));

export const Link: ForwardRefExoticComponent<LinkProps> = forwardRef((props, ref) => <LinkFactory ref={ref} {...props} map={useMap()} />);

export const ListItem: ForwardRefExoticComponent<ListItemProps> = forwardRef((props, ref) => (
  <ListItemFactory ref={ref} {...props} map={useMap()} />
));

export const Loading: ForwardRefExoticComponent<LoadingProps> = forwardRef((props, ref) => (
  <LoadingFactory ref={ref} {...props} map={useMap()} />
));

export const Modal: ForwardRefExoticComponent<ModalProps> = forwardRef((props, ref) => (
  <ModalFactory ref={ref} {...props} map={useMap()} />
));

export const Progress: ForwardRefExoticComponent<ProgressProps> = forwardRef((props, ref) => (
  <ProgressFactory ref={ref} {...props} map={useMap()} />
));

export const Select: ForwardRefExoticComponent<SelectProps> = forwardRef((props, ref) => (
  <SelectFactory ref={ref} {...props} map={useMap()} />
));

export const Table: ForwardRefExoticComponent<TableProps> = forwardRef((props, ref) => (
  <TableFactory ref={ref} {...props} map={useMap()} />
));

export const Text: ForwardRefExoticComponent<TextProps> = forwardRef((props, ref) => <TextFactory ref={ref} {...props} map={useMap()} />);

export const Tooltip: ForwardRefExoticComponent<TooltipProps> = forwardRef((props, ref) => (
  <TooltipFactory ref={ref} {...props} map={useMap()} />
));

/**************
 * Animations *
 **************/

export const Animation: ForwardRefExoticComponent<AnimationProps> = forwardRef((props, ref) => (
  <AnimationFactory ref={ref} {...props} map={useMap()} />
));

// @ts-ignore
Animation.FadeIn = forwardRef<typeof Animation, AnimationProps>((props, ref) => (
  <AnimationFactory ref={ref} {...props} map={useMap()} from={{ opacity: 0 }} to={{ opacity: 1 }} />
));

// @ts-ignore
Animation.FadeOut = forwardRef<typeof Animation, AnimationProps>((props, ref) => (
  <AnimationFactory ref={ref} {...props} map={useMap()} from={{ opacity: 1 }} to={{ opacity: 0 }} />
));

// @ts-ignore
Animation.ZoomIn = forwardRef<typeof Animation, AnimationProps>((props, ref) => (
  <AnimationFactory ref={ref} {...props} map={useMap()} from={{ transform: [{ scale: 0 }] }} to={{ transform: [{ scale: 1 }] }} />
));

// @ts-ignore
Animation.ZoomOut = forwardRef<typeof Animation, AnimationProps>((props, ref) => (
  <AnimationFactory ref={ref} {...props} map={useMap()} from={{ transform: [{ scale: 1 }] }} to={{ transform: [{ scale: 0 }] }} />
));

// @ts-ignore
Animation.Spin = forwardRef<typeof Animation, AnimationProps>((props, ref) => (
  <AnimationFactory
    ref={ref}
    {...props}
    map={useMap()}
    from={{ transform: [{ rotate: '0deg' }] }}
    to={{ transform: [{ rotate: '360deg' }] }}
  />
));
