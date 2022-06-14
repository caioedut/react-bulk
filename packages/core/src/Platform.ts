const Platform = {
  web: typeof document !== 'undefined',
  native: typeof document === 'undefined',
  // typeof navigator !== 'undefined' && navigator.product === 'ReactNative'
};

export default Platform;
