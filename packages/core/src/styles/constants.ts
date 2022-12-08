/************
 * Box Size *
 ************/

export const boxSizeProps = [
  'width',
  'height',
  'maxWidth',
  'maxHeight',
  // Aliases
  'w',
  'h',
  'maxw',
  'maxh',
  'minw',
  'minh',
] as const;

/***********
 * Flexbox *
 ***********/

export const flexContainerAlignProps = [
  'placeContent',
  'placeItems',
  'alignContent',
  'alignItems',
  'justifyContent',
  'justifyItems',
  // Aliases
  'center',
] as const;

export const flexChildAlignProps = [
  'placeSelf',
  'alignSelf',
  'justifySelf',
  // Aliases
  'align',
  'justify',
] as const;

export const flexAlignProps = [...flexContainerAlignProps, ...flexChildAlignProps] as const;

export const flexContainerProps = [
  'flexDirection',
  'flexFlow',
  'flexWrap',
  ...flexContainerAlignProps,
  // Aliases
  'direction',
  'row',
  'column',
  'reverse',
  'wrap',
  'noWrap',
] as const;

export const flexChildProps = [
  'flex',
  'flexBasis',
  'flexGrow',
  'flexShrink',
  'order',
  ...flexChildAlignProps,
  // Aliases
  'grow',
  'shrink',
  'basis',
] as const;

export const flexProps = [...flexAlignProps, ...flexContainerProps, ...flexChildProps] as const;

/************
 * Spacings *
 ************/
export const customSpacings = [
  'i',
  't',
  'b',
  'l',
  'r',
  'm',
  'mt',
  'mb',
  'ml',
  'mr',
  'mh',
  'mv',
  'mx',
  'my',
  'p',
  'pt',
  'pb',
  'pl',
  'pr',
  'px',
  'py',
] as const;

export const customStyleProps = [
  'w',
  'h',
  'maxw',
  'maxh',
  'minw',
  'minh',
  'bg',
  'border',
  'borderTop',
  'borderBottom',
  'borderLeft',
  'borderRight',
  'corners',
  'direction',
  'shadow',
  ...customSpacings,
] as const;

export const spacings = [
  'position',
  'top',
  'bottom',
  'left',
  'right',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'paddingVertical',
  // Aliases
  ...customSpacings,
] as const;

// See https://react-cn.github.io/react/tips/style-props-value-px.html
export const notPxProps = [
  'animationIterationCount',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'fillOpacity',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'scale',
  'stopOpacity',
  'strokeDashoffset',
  'strokeOpacity',
  'strokeWidth',
  'tabSize',
  'widows',
  'zIndex',
  'zoom',
] as const;

export const rbkStyleProps = [
  'position',
  'h',
  'w',
  'minw',
  'maxw',
  'minh',
  'maxh',
  'bg',
  'border',
  'corners',
  'shadow',
  'i',
  't',
  'b',
  'l',
  'r',
  'm',
  'mt',
  'mb',
  'ml',
  'mr',
  'mh',
  'mx',
  'mv',
  'my',
  'p',
  'pt',
  'pb',
  'pl',
  'pr',
  'px',
  'py',
] as const;

/************************
 * All Supported Styles *
 ************************/
export const styleProps = [
  ...boxSizeProps,
  ...flexProps,
  ...spacings,
  ...customStyleProps,
  'backfaceVisibility',
  'backgroundColor',
  'borderBottomColor',
  'borderBottomEndRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStartRadius',
  'borderBottomWidth',
  'borderColor',
  'borderEndColor',
  'borderEndWidth',
  'borderLeftColor',
  'borderLeftWidth',
  'borderRadius',
  'borderRightColor',
  'borderRightWidth',
  'borderStartColor',
  'borderStartWidth',
  'borderStyle',
  'borderTopColor',
  'borderTopEndRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStartRadius',
  'borderTopWidth',
  'borderWidth',
  'color',
  'direction',
  'display',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'opacity',
  'overflow',
  'textAlign',
  'textTransform',
  'zIndex',
] as const;
