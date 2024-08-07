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
  'ww',
  'hh',
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

export const flexProps = [...flexAlignProps, ...flexContainerProps, ...flexChildProps];

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
  'mx',
  'mv',
  'my',
  'p',
  'pt',
  'pb',
  'pl',
  'pr',
  'ph',
  'px',
  'pv',
  'py',
  'g',
  'gx',
  'gy',
] as const;

export const customStyleProps = [
  'bg',
  'border',
  'borderBottom',
  'borderLeft',
  'borderRight',
  'borderTop',
  'corners', // borderRadius * spacing
  'direction',
  'h', // height
  'lh', // line height
  'ls', // line spacing
  'maxh',
  'maxw',
  'minh',
  'minw',
  'position',
  'shadow', // box-shadow
  'w', // width
  ...customSpacings,
] as const;

export const gapSpacings = ['gap', 'rowGap', 'columnGap'] as const;

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
  // Gaps
  ...gapSpacings,
  // Aliases
  ...customSpacings,
] as const;

export const transformProps = [
  'matrix',
  'perspective',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'scaleX',
  'scaleY',
  'translateX',
  'translateY',
  'skewX',
  'skewY',
] as const;

// See https://react-cn.github.io/react/tips/style-props-value-px.html
export const notPxProps = [
  'animationIterationCount',
  'aspectRatio',
  'borderImageOutset',
  'borderImageSlice',
  'borderImageWidth',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'columns',
  'fillOpacity',
  'flex',
  'flexGrow',
  'flexNegative',
  'flexOrder',
  'flexPositive',
  'flexShrink',
  'floodOpacity',
  'fontWeight',
  'gridArea',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnSpan',
  'gridColumnStart',
  'gridRow',
  'gridRowEnd',
  'gridRowSpan',
  'gridRowStart',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'rotate',
  'scale',
  'stopOpacity',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
  'tabSize',
  'transform',
  'widows',
  'zIndex',
  'zoom',
] as const;

/************************
 * All Supported Styles *
 ************************/
export const styleProps = [
  ...boxSizeProps,
  ...flexProps,
  ...spacings,
  ...customStyleProps,
  'aspectRatio',
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
  'boxShadow',
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
  'pointerEvents',
  'textAlign',
  'textTransform',
  'transform',
  'zIndex',
] as const;

export const aliases = {
  w: 'width',
  h: 'height',
  maxw: 'maxWidth',
  maxh: 'maxHeight',
  minw: 'minWidth',
  minh: 'minHeight',
  lh: 'lineHeight',
  ls: 'letterSpacing',
  bg: 'backgroundColor',

  // Flex Container
  direction: 'flexDirection',

  // Flex Item
  grow: 'flexGrow',
  shrink: 'flexShrink',
  basis: 'flexBasis',
  align: 'alignSelf',
  justify: 'justifySelf',
};
