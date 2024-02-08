import Platform from '../Platform';
import css from '../styles/css';
import jss from '../styles/jss';
import { RbkStyle } from '../types';

export default function setNativeStyle($el, styles: RbkStyle) {
  const { web, native } = Platform;

  if ($el) {
    if (web) {
      $el.style.cssText += `; ${css(styles)} ;`;
    }

    if (native) {
      $el.setNativeProps(jss(styles));
    }
  }
}
