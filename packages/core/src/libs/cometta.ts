import cometta, { ComettaStyle } from 'cometta';

import Platform from '../Platform';
import { aliases, boxSizeProps, customSpacings, flexAlignProps, notPxProps } from '../styles/constants';
import transform from '../styles/transform';
import { ThemeProps } from '../types';
import defined from '../utils/defined';
import rbkGlobal from '../utils/global';

export default function registry(theme?: ThemeProps) {
  theme = theme ?? rbkGlobal.theme ?? {};

  if (theme) {
    if (Platform.web) {
      cometta.polyfill({
        fontSize: theme.rem(1),
      });
    }

    if (Platform.native) {
      cometta.polyfill({
        fontSize: theme.rem(1),
        screenWidth: () => rbkGlobal.mapping.dimensions.window().width,
        screenHeight: () => rbkGlobal.mapping.dimensions.window().height,
      });
    }

    cometta.unit('gap', (value) => {
      return value * theme.shape.gap * theme.shape.spacing;
    });

    // Create Vars
    const vars = Object.assign(
      {},
      ...Object.entries(theme.colors)
        .map(([name, variants]) =>
          Object.entries(variants).map(([variant, color]) => {
            const result = {
              [`${name}-${variant}`]: color,
            };

            if (variant === 'main') {
              result[`${name}`] = color;
            }

            return result;
          }),
        )
        .flat(),
    );

    cometta.variables(vars);
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

    const radius = Math.round(value + (value ? 2 : 0));
    const offset = Math.round(value / 2);

    if (Platform.web) {
      return {
        boxShadow: `${offset}px ${offset}px ${radius}px rgba(0, 0, 0, ${value ? 0.15 : 0})`,
      };
    }

    if (Platform.native) {
      return {
        elevation: Math.round(value),
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

    const parsed = transform(value);

    return {
      transform: Object.entries(parsed)
        .map(([attr, val]) => {
          if (typeof val === 'number' && !notPxProps.includes(attr as any)) {
            val = `${val}px`;
          }

          return `${attr}(${val})`;
        })
        .join(' '),
    } as ComettaStyle;
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

    if (['g', 'gx', 'gy'].includes(prop)) {
      prop = prop === 'gy' ? 'rowGap' : prop === 'gx' ? 'columnGap' : 'gap';

      if (value === true) {
        value = 1;
      }

      if (typeof value === 'number' && theme) {
        value = `${value}gap`;
      }
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
