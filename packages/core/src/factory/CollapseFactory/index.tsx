import React, { forwardRef, useEffect, useMemo, useRef } from 'react';

import rect from '../../element/rect';
import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { CollapseProps } from '../../types';
import event from '../../utils/event';
import global from '../../utils/global';
import sleep from '../../utils/sleep';
import BoxFactory from '../BoxFactory';

const CollapseFactory = React.memo<CollapseProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Collapse;
    const { web, native } = global.mapping;

    // Extends from default props
    let {
      visible,
      in: expanded,
      // Styles
      variants,
      ...rest
    } = factory2<CollapseProps>(props, options);

    expanded = visible ?? expanded;

    const defaultRef: any = useRef(null);
    ref = ref || defaultRef;

    const initialized = useRef(false);
    const initExpanded = useMemo(() => expanded, []);

    const emptyValue = native ? 'auto' : '';

    useEffect(() => {
      //@ts-ignore
      if (!web || !ref?.current) return;

      //@ts-ignore
      const $el = ref?.current;

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

      // @ts-ignore
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

        // TODO: remove complete "if" and animate HEIGHT
        if (native && expanded) {
          newSize = 'auto';
        }

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
        ref={ref}
        platform={{ native: { collapsable: false } }}
        stylist={[variants.root, stylist]}
        rawStyle={!initExpanded && { height: 0 }}
      >
        <BoxFactory {...rest} />
      </BoxFactory>
    );
  }),
);

CollapseFactory.displayName = 'CollapseFactory';

export default CollapseFactory;
