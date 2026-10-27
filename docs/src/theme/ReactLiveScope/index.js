import React from 'react';

import {
  useAnimation,
  useDefaultRef,
  useDeferredValue,
  useDependentState,
  useDraggable,
  useForm,
  useHtmlId,
  useInput,
  usePropState,
  useTheme,
  useToaster,
} from '@react-bulk/core';
import * as Rbk from '@react-bulk/web';

const ReactBulk = Rbk.default;

// Add react-live imports you need here
const ReactLiveScope = {
  ReactBulk,
  useAnimation,
  useDefaultRef,
  useDeferredValue,
  useDependentState,
  useDraggable,
  useForm,
  useHtmlId,
  useInput,
  usePropState,
  useTheme,
  useToaster,
  ...Rbk,
  React,
  ...React,
};

// Fix ReactLiveScope bug
delete ReactLiveScope.default;

export default ReactLiveScope;
