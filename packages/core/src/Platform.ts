const canUseDOM = Boolean(typeof window !== 'undefined' && window?.document?.createElement);
const canUseNative = typeof navigator !== 'undefined' && navigator?.product === 'ReactNative';

const native = canUseNative;
const web = !native && canUseDOM;
const server = !native && !web;

const Platform = {
  web,
  native,
  server,
};

export default Platform;
