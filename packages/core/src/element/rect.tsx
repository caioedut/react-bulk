import Platform from '../Platform';
import { RbkRect } from '../types';

export default async function rect($el): Promise<RbkRect> {
  const { web, native } = Platform;

  if (web) {
    const { offsetLeft: offsetX, offsetTop: offsetY } = $el;
    const { width, height, left: pageOffsetX, top: pageOffsetY } = $el.getBoundingClientRect();
    return { width, height, offsetX, offsetY, pageOffsetX, pageOffsetY };
  }

  if (native) {
    return new Promise((resolve) =>
      $el.measure((offsetX, offsetY, width, height, pageOffsetX, pageOffsetY) =>
        resolve({ width, height, offsetX, offsetY, pageOffsetX, pageOffsetY }),
      ),
    );
  }

  return {} as RbkRect;
}
