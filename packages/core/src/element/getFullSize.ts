import Platform from '../Platform';
import sleep from '../utils/sleep';
import rect from './rect';
import setNativeStyle from './setNativeStyle';

export default async function getFullSize($el) {
  const { native } = Platform;

  const metricsINI = await rect($el);

  // Set invisible height auto
  setNativeStyle($el, {
    height: 'auto',
    opacity: 0,
    position: 'absolute',
    width: 'auto',
  });

  if (native) {
    await sleep(0);
  }

  const metricsAuto = await rect($el);

  // Restore styles
  setNativeStyle($el, {
    height: metricsINI.height,
    opacity: 1,
    position: 'relative',
    width: metricsINI.height,
  });

  if (native) {
    await sleep(0);
  }

  return metricsAuto;
}
