import React, { useEffect, useMemo, useRef } from 'react';

import { useTheme } from '../../ReactBulk';
import rect from '../../element/rect';
import factory2 from '../../props/factory2';
import { CollapseProps, FactoryProps } from '../../types';
import event from '../../utils/event';
import sleep from '../../utils/sleep';
import BoxFactory from '../BoxFactory';

function CollapseFactory({ stylist, map, ...props }: FactoryProps & CollapseProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Collapse;
  const { web, native } = map;

  // Extends from default props
  let {
    in: expanded,
    // Styles
    variants,
    ...rest
  } = factory2(props, options, theme);

  const defaultRef: any = useRef(null);
  ref = ref || defaultRef;

  const initialized = useRef(false);
  const initExpanded = useMemo(() => expanded, []);

  const emptyValue = native ? 'auto' : '';

  // @ts-ignore
  useEffect(() => {
    if (!web || !ref.current) return;

    const $el = ref.current;

    const complete = () => {
      if ($el.offsetHeight <= 0) return;
      setStyles($el, { height: emptyValue });
    };

    const remove = event($el, 'transitionend', complete);

    return () => {
      remove();
    };
  }, [ref]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    const $el = ref.current;

    (async () => {
      // Reset CSS to get original size
      setStyles($el, {
        height: emptyValue,
        opacity: native ? 0 : '0',
      });

      native && (await sleep(10));

      const size = web ? $el.offsetHeight : (await rect($el)).height;

      let curSize = expanded ? 0 : size;
      let newSize = expanded ? size : 0;

      setStyles($el, {
        height: curSize,
        opacity: native ? 1 : '1',
      });

      if (web) {
        setStyles($el, theme.mixins.transitions.medium);
        await sleep(10);
      }

      setStyles($el, { height: newSize });
    })();
  }, [expanded]);

  function setStyles($el, styles: any = {}) {
    if (web) {
      for (let attr in styles) {
        const value = styles[attr];
        $el.style[attr] = value && !isNaN(value) ? `${value}px` : value;
      }
    }

    if (native) {
      $el.setNativeProps(styles);
    }
  }

  return (
    <BoxFactory
      map={map}
      ref={ref}
      platform={{ native: { collapsable: false } }}
      stylist={[variants.root, stylist]}
      rawStyle={!initExpanded && { height: 0 }}
    >
      <BoxFactory map={map} {...rest} />
    </BoxFactory>
  );
}

export default React.forwardRef(CollapseFactory);
