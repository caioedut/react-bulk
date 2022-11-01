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
];

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
];

export const flexChildAlignProps = [
  'placeSelf',
  'alignSelf',
  'justifySelf',
  // Aliases
  'align',
  'justify',
];

export const flexAlignProps = [...flexContainerAlignProps, ...flexChildAlignProps];

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
];

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
];

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
];

export const customStyleProps = ['w', 'h', 'maxw', 'maxh', 'minw', 'minh', 'bg', 'border', 'corners', 'shadow', ...customSpacings];

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
];

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
];

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
];
