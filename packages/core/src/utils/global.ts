let currentGlobal: any = {};

if (typeof process !== 'undefined') {
  currentGlobal = process;
}

if (typeof global !== 'undefined') {
  currentGlobal = global;
}

if (typeof window !== 'undefined') {
  currentGlobal = window;
}

if (!currentGlobal._RBK) {
  currentGlobal._RBK = {
    theme: {},
    mapping: {},
    styles: {},
  } as any;
}

export default currentGlobal._RBK;
