import { AnyObject } from '@react-bulk/core';

import Platform from '../Platform';
import jss from '../styles/jss';
import { notPxProps } from './constants';

export default function transform(value) {
  const { web, native } = Platform;

  // TODO transformProps
  let parsed: AnyObject = {};

  // Force an object
  if (typeof value === 'string') {
    value.split(/\s/g).forEach((item) => {
      const match = item.trim().match(/(.*)\((.*)\)(\[([^\]]*)\])?/);

      if (match?.[2]) {
        parsed[match?.[1]] = match?.[2];
      }
    });

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === 'object' && item) {
          Object.entries(item).forEach(([attr, val]) => {
            parsed[attr] = val;
          });
        }
      });
    }
  }

  parsed = jss(parsed);

  if (web) {
    value = Object.entries(value)
      .map(([attr, val]) => {
        if (typeof val === 'number' && !notPxProps.includes(attr as any)) {
          val = `${val}px`;
        }

        return `${attr}(${val})`;
      })
      .join(' ');
  }

  // TODO: remove on next versions (RN now supports string transform)
  if (native) {
    if (typeof value === 'object' && value) {
      value = Object.entries(value).map(([attr, value]) => ({ [attr]: value }));
    }
  }

  return value;
}

// export default function transform(value) {
//   const { web, native } = Platform;
//
//   if (web) {
//     if (typeof value === 'object' && value) {
//       value = Object.entries(value)
//         .map(([attr, val]) => `${attr}(${val})`)
//         .join(' ');
//     }
//
//     if (Array.isArray(value)) {
//       value = value
//         .map((item) => {
//           if (typeof item === 'object' && item) {
//             return Object.entries(item)
//               .map(([attr, val]) => `${attr}(${val})`)
//               .join(' ');
//           }
//
//           return item;
//         })
//         .join(' ');
//     }
//   }
//
//   if (native) {
//     if (typeof value === 'object' && value) {
//       value = Object.entries(value).map(([attr, value]) => ({ [attr]: value }));
//     }
//
//     if (typeof value === 'string') {
//       value = value
//         .split(/\s/g)
//         .filter((item) => item.trim())
//         .map((item) => {
//           const match = item.match(/(.*)\((.*)\)(\[([^\]]*)\])?/);
//           return { [match?.[1] as string]: match?.[2] };
//         });
//     }
//   }
//
//   return value;
// }

// export default function transform(value) {
//   if (typeof value === 'string') {
//     value = value
//       .split(/\s/g)
//       .filter((item) => item.trim())
//       .map((item) => {
//         const match = item.match(/(.*)\((.*)\)(\[([^\]]*)\])?/);
//         return { [match?.[1] as string]: match?.[2] };
//       });
//   }
//
//   return value;
// }
