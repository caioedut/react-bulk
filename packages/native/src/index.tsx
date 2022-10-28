import { ForwardRefExoticComponent, forwardRef, memo } from 'react';

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
  CarouselFactory,
  CarouselProps,
  CheckboxFactory,
  CheckboxProps,
  CollapseFactory,
  CollapseProps,
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
  SliderFactory,
  SliderProps,
  TableFactory,
  TableProps,
  TextFactory,
  TextProps,
  TooltipFactory,
  TooltipProps,
} from '@react-bulk/core';

import useMap from './useMap';

export { default as Image } from './Image';
export { default as Scrollable } from './Scrollable';

export const Backdrop: ForwardRefExoticComponent<BackdropProps> = memo(
  forwardRef((props, ref) => <BackdropFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Badge: ForwardRefExoticComponent<BadgeProps> = memo(
  forwardRef((props, ref) => <BadgeFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Box: ForwardRefExoticComponent<BoxProps> = memo(
  forwardRef((props, ref) => <BoxFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Button: ForwardRefExoticComponent<ButtonProps> = memo(
  forwardRef((props, ref) => <ButtonFactory innerRef={ref} {...props} map={useMap()} />),
);

export const ButtonGroup: ForwardRefExoticComponent<ButtonGroupProps> = memo(
  forwardRef((props, ref) => <ButtonGroupFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Card: ForwardRefExoticComponent<CardProps> = memo(
  forwardRef((props, ref) => <CardFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Carousel: ForwardRefExoticComponent<CarouselProps> = memo(
  forwardRef((props, ref) => <CarouselFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Checkbox: ForwardRefExoticComponent<CheckboxProps> = memo(
  forwardRef((props, ref) => <CheckboxFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Collapse: ForwardRefExoticComponent<CollapseProps> = memo(
  forwardRef((props, ref) => <CollapseFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Divider: ForwardRefExoticComponent<DividerProps> = memo(
  forwardRef((props, ref) => <DividerFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Dropdown: ForwardRefExoticComponent<DropdownProps> = memo(
  forwardRef((props, ref) => <DropdownFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Form: ForwardRefExoticComponent<FormProps> = memo(
  forwardRef((props, ref) => <FormFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Grid: ForwardRefExoticComponent<GridProps> = memo(
  forwardRef((props, ref) => <GridFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Input: ForwardRefExoticComponent<InputProps> = memo(
  forwardRef((props, ref) => <InputFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Label: ForwardRefExoticComponent<LabelProps> = memo(
  forwardRef((props, ref) => <LabelFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Link: ForwardRefExoticComponent<LinkProps> = memo(
  forwardRef((props, ref) => <LinkFactory innerRef={ref} {...props} map={useMap()} />),
);

export const ListItem: ForwardRefExoticComponent<ListItemProps> = memo(
  forwardRef((props, ref) => <ListItemFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Loading: ForwardRefExoticComponent<LoadingProps> = memo(
  forwardRef((props, ref) => <LoadingFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Modal: ForwardRefExoticComponent<ModalProps> = memo(
  forwardRef((props, ref) => <ModalFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Progress: ForwardRefExoticComponent<ProgressProps> = memo(
  forwardRef((props, ref) => <ProgressFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Select: ForwardRefExoticComponent<SelectProps> = memo(
  forwardRef((props, ref) => <SelectFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Slider: ForwardRefExoticComponent<SliderProps> = memo(
  forwardRef((props, ref) => <SliderFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Table: ForwardRefExoticComponent<TableProps> = memo(
  forwardRef((props, ref) => <TableFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Text: ForwardRefExoticComponent<TextProps> = memo(
  forwardRef((props, ref) => <TextFactory innerRef={ref} {...props} map={useMap()} />),
);

export const Tooltip: ForwardRefExoticComponent<TooltipProps> = memo(
  forwardRef((props, ref) => <TooltipFactory innerRef={ref} {...props} map={useMap()} />),
);

/**************
 * Animations *
 **************/

export const Animation: ForwardRefExoticComponent<AnimationProps> = memo(
  forwardRef((props, ref) => <AnimationFactory innerRef={ref} {...props} map={useMap()} />),
);

// @ts-ignore
Animation.FadeIn = memo(
  forwardRef<typeof Animation, AnimationProps>((props, ref) => (
    <AnimationFactory innerRef={ref} {...props} map={useMap()} from={{ opacity: 0 }} to={{ opacity: 1 }} />
  )),
);

// @ts-ignore
Animation.FadeOut = memo(
  forwardRef<typeof Animation, AnimationProps>((props, ref) => (
    <AnimationFactory innerRef={ref} {...props} map={useMap()} from={{ opacity: 1 }} to={{ opacity: 0 }} />
  )),
);

// @ts-ignore
Animation.ZoomIn = memo(
  forwardRef<typeof Animation, AnimationProps>((props, ref) => (
    <AnimationFactory innerRef={ref} {...props} map={useMap()} from={{ transform: [{ scale: 0 }] }} to={{ transform: [{ scale: 1 }] }} />
  )),
);

// @ts-ignore
Animation.ZoomOut = memo(
  forwardRef<typeof Animation, AnimationProps>((props, ref) => (
    <AnimationFactory innerRef={ref} {...props} map={useMap()} from={{ transform: [{ scale: 1 }] }} to={{ transform: [{ scale: 0 }] }} />
  )),
);

// @ts-ignore
Animation.Spin = memo(
  forwardRef<typeof Animation, AnimationProps>((props, ref) => (
    <AnimationFactory
      innerRef={ref}
      {...props}
      map={useMap()}
      from={{ transform: [{ rotate: '0deg' }] }}
      to={{ transform: [{ rotate: '360deg' }] }}
    />
  )),
);
