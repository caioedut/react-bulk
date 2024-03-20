import cometta, { ComettaStyle } from 'cometta';

import Platform from '../Platform';
import { aliases, boxSizeProps, customSpacings, flexAlignProps, notPxProps } from '../styles/constants';
import { ThemeProps } from '../types';
import defined from '../utils/defined';
import global from '../utils/global';

export default function registry(theme?: ThemeProps) {
  theme = theme ?? global.theme ?? {};

  if (Platform.web && theme) {
    cometta.polyfill({
      fontSize: theme.rem(1),
    });
  }

  if (Platform.native && theme) {
    cometta.polyfill({
      fontSize: theme.rem(1),
      screenWidth: () => global.mapping.dimensions.window().width,
      screenHeight: () => global.mapping.dimensions.window().height,
    });
  }

  cometta.parser('web', (value) => (Platform.web ? value : {}));

  cometta.parser('native', (value) => (Platform.native ? value : {}));

  cometta.parser('ww', (value) => ({
    width: value,
    minWidth: value,
    maxWidth: value,
  }));

  cometta.parser('hh', (value) => ({
    height: value,
    minHeight: value,
    maxHeight: value,
  }));

  cometta.parser('corners', (value) => {
    if (!defined(value)) return;

    return {
      borderRadius: (theme?.shape?.borderRadius ?? 0) * value,
    };
  });

  cometta.parser('shadow', (value) => {
    if (!defined(value)) return;

    const radius = Math.round(value * 1.5 + (value ? 2 : 0));
    const offset = Math.round(value / 2);

    if (Platform.web) {
      return {
        boxShadow: `${offset}px ${offset}px ${radius}px rgba(0, 0, 0, ${value ? 0.15 : 0})`,
      };
    }

    if (Platform.native) {
      return {
        elevation: offset,
        shadowColor: 'rgba(0, 0, 0)',
        shadowOpacity: 0.1,
        shadowRadius: radius,
        shadowOffset: {
          width: offset,
          height: offset,
        },
      } as ComettaStyle;
    }
  });

  cometta.parser('transform', (value) => {
    if (!defined(value)) return;

    if (Platform.web && Array.isArray(value)) {
      const values: string[] = [];

      value.forEach((item) => {
        for (const attr in item) {
          let unit = Array.isArray(item[attr]) ? item[attr].join(', ') : item[attr];

          // @ts-expect-error
          if (unit && typeof unit === 'number' && !notPxProps.includes(attr)) {
            unit = `${unit}px`;
          }

          values.push(`${attr}(${unit})`);
        }
      });

      if (values.length) {
        return { transform: values.join(' ') };
      }
    }

    return { transform: value };
  });

  cometta.parser('inset', (value) => {
    if (!defined(value)) return;

    if (Platform.native) {
      const [v1, v2, v3, v4] = `${value ?? ''}`
        .trim()
        .split(/\s/g)
        .filter((item: string) => item.trim());

      return {
        top: parseUnit(v1),
        right: parseUnit(v2 ?? v1),
        bottom: parseUnit(v3 ?? v1),
        left: parseUnit(v4 ?? v2 ?? v1),
      };
    }

    return { inset: value } as ComettaStyle;
  });

  //   cometta.parser('boxShadow', (value) => {
  //   const colorIndex = value.search(/(\w+\(|#).+/g);
  //
  //   let color = 'rgba(0, 0, 0, 0)';
  //
  //   if (colorIndex >= 0) {
  //     color = value.substring(colorIndex);
  //     value = value.substring(0, colorIndex);
  //   }
  //
  //   const split = value.split(' ').filter((item: any) => item.trim() && !item.includes('inset'));
  //   const [width, height, shadowRadius] = split.map((item: string) => Number(item.replace(/\D/g, '') || 0));
  //
  //   return {
  //     shadowColor: theme.color(color) ?? color,
  //     shadowOpacity: 0.18,
  //     shadowRadius,
  //     shadowOffset: { height, width },
  //   };
  // })

  cometta.parser('*', (value, prop) => {
    if (typeof value === 'undefined') return;

    const prevProp = prop;
    const prevValue = value;

    if (value instanceof Function) {
      value = value(theme);
    }

    if (prop.toLowerCase().includes('color') && theme) {
      value = theme.color(value) ?? value;
    }

    if (boxSizeProps.includes(prop as any) && value === true) {
      value = '100%';
    }

    if (customSpacings.includes(prop as any)) {
      prop = prop
        .replace(/^i$/, 'inset')
        .replace(/^(.)t$/, '$1Top')
        .replace(/^(.)b$/, '$1Bottom')
        .replace(/^(.)l$/, '$1Left')
        .replace(/^(.)r$/, '$1Right')
        .replace(/^(.)h$/, '$1Horizontal')
        .replace(/^(.)v$/, '$1Vertical')
        .replace(/^(.)x$/, '$1Horizontal')
        .replace(/^(.)y$/, '$1Vertical')
        .replace(/^m/, 'margin')
        .replace(/^p/, 'padding')
        .replace(/^t$/, 'top')
        .replace(/^b$/, 'bottom')
        .replace(/^l$/, 'left')
        .replace(/^r$/, 'right');

      if (value === true) {
        value = 1;
      }

      if (typeof value === 'number' && theme) {
        value = theme.spacing(value);
      }
    }

    if (flexAlignProps.includes(prop as any)) {
      value = parseFlexAlign(value);
    }

    // Aliases
    prop = aliases[prop] ?? prop;

    if (Platform.native) {
      const valueSplit = `${value ?? ''}`
        .trim()
        .split(/\s/g)
        .filter((item: string) => item.trim());

      // place-* props
      ['Content', 'Items', 'Self'].forEach((suffix) => {
        if (prop === 'place' + suffix) {
          const [v1, v2] = valueSplit;

          return {
            [`align${suffix}`]: parseFlexAlign(v1),
            [`justify${suffix}`]: parseFlexAlign(v2 ?? v1),
          };
        }
      });
    }

    // Final value
    if (prop !== prevProp || value !== prevValue) {
      return cometta.jss({ [prop]: value });
    }
  });
}

const parseUnit = (value: any) => {
  return isNaN(value) ? value : Number(value);
};

const parseFlexAlign = (value: string) => {
  return value
    .replace(/^normal$/, 'stretch')
    .replace(/^start$/, 'flex-start')
    .replace(/^end$/, 'flex-end')
    .replace(/^space$/, 'space-between')
    .replace(/^between$/, 'space-between')
    .replace(/^around$/, 'space-around')
    .replace(/^evenly$/, 'space-evenly');
};
