import React, { RefObject, forwardRef, useEffect, useMemo, useRef } from 'react';

import rect from '../../element/rect';
import useAnimation from '../../hooks/useAnimation';
import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { CollapseProps } from '../../types';
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

    const defaultRef: any = useRef(null);
    const rootRef: RefObject<any> = ref || defaultRef;

    const emptyValue = 'auto';
    const isExpanded = useMemo(() => visible ?? expanded ?? false, [visible, expanded]);
    const heightAnim = useAnimation({ height: isExpanded ? emptyValue : 0 });

    useEffect(() => {
      if (!rootRef?.current) return;

      (async () => {
        if (native) {
          // Reset to get original size
          rootRef.current.setNativeProps({ height: 'auto' });
          await sleep(1);
        }

        const metrics = await rect(rootRef.current);
        const size = web ? rootRef.current?.scrollHeight : metrics.height;

        let curSize = isExpanded ? 0 : size;
        let newSize = isExpanded ? size : 0;

        if (newSize === metrics.height) return;

        await heightAnim.start({ height: curSize }, { duration: 0 });

        // TODO: check why animation dont work on native
        await heightAnim.start({ height: newSize });

        if (newSize > 0) {
          await heightAnim.start({ height: emptyValue });
        }
      })();
    }, [rootRef, isExpanded]);

    return (
      <BoxFactory
        ref={rootRef}
        noRootStyles
        component={heightAnim.Component}
        platform={{ native: { collapsable: false } }}
        style={{ height: 0 }}
        stylist={[variants.root, stylist]}
        rawStyle={heightAnim.style}
      >
        <BoxFactory {...rest} />
      </BoxFactory>
    );
  }),
);

CollapseFactory.displayName = 'CollapseFactory';

export default CollapseFactory;
