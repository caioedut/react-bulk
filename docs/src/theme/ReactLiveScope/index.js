import React from 'react';

import ReactBulk from '@react-bulk/core';
import * as Rbk from '@react-bulk/web';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ReactBulk,
  ...Rbk,
};

export default ReactLiveScope;
