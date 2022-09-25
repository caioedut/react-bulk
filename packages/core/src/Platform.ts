const Platform = {
  web: typeof document !== 'undefined',
  native: typeof document === 'undefined',
};

export default Platform;
