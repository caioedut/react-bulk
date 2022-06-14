import mergeStyles from './mergeStyles';

export default function getStyle(styles: any, prop: any) {
  // @ts-ignore
  return mergeStyles(styles)[prop];
}
