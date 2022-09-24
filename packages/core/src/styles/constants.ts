/************
 * Box Size *
 ************/

export const boxSizeProps = ['w', 'h', 'maxw', 'maxh', 'minw', 'minh'];

/***********
 * Flexbox *
 ***********/

export const flexContainerAlignProps = ['placeContent', 'placeItems', 'alignContent', 'alignItems', 'justifyContent', 'justifyItems'];

export const flexChildAlignProps = ['placeSelf', 'alignSelf', 'justifySelf'];

export const flexAlignProps = [...flexContainerAlignProps, ...flexChildAlignProps];

export const flexContainerProps = ['flexDirection', 'flexFlow', 'flexWrap', ...flexContainerAlignProps];

export const flexChildProps = ['flex', 'flexBasis', 'flexGrow', 'flexShrink', 'order', ...flexChildAlignProps];

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
