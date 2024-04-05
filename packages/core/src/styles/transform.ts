import { AnyObject } from '@react-bulk/core';

import jss from '../styles/jss';

function isObject(item: object) {
  return typeof item === 'object' && Boolean(item) && !Array.isArray(item);
}

export default function transform(value) {
  // Force an object
  const parsed: AnyObject = {};

  if (typeof value === 'string') {
    value.split(/\s/g).forEach((item) => {
      const match = item.trim().match(/(.*)\((.*)\)(\[([^\]]*)\])?/);

      if (match?.[2]) {
        parsed[match?.[1]] = match?.[2];
      }
    });
  }

  if (Array.isArray(value)) {
    value.forEach((item) => {
      if (isObject(item)) {
        Object.entries(item).forEach(([attr, val]) => {
          parsed[attr] = val;
        });
      }
    });
  }

  if (isObject(value)) {
    Object.entries(value).forEach(([attr, val]) => {
      parsed[attr] = val;
    });
  }

  // Cast numbers
  Object.entries(parsed).forEach(([attr, val]) => {
    parsed[attr] = isNaN(val as any) ? val : Number(val);
  });

  return jss(parsed);
}
