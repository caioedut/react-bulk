import React, { RefObject, forwardRef, useEffect, useMemo, useRef } from 'react';

import rect from '../../element/rect';
import setNativeStyle from '../../element/setNativeStyle';
import useTheme from '../../hooks/useTheme';
import useTransition from '../../hooks/useTransition';
import factory2 from '../../props/factory2';
import { CollapseProps } from '../../types';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';

const CollapseFactory = React.memo<CollapseProps>(
  forwardRef(({ stylist, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Collapse;
    const { web, native } = global.mapping;

    // Extends from default props
    const {
      visible,
      in: expanded,
      // Styles
      variants,
      ...rest
    } = factory2<CollapseProps>(props, options);

    const defaultRef: any = useRef(null);
    const rootRef: RefObject<any> = ref || defaultRef;

    const isExpanded = useMemo(() => visible ?? expanded ?? false, [visible, expanded]);
    const transition = useTransition({}, rootRef);

    const initialStyle = useMemo(
      () => ({
        height: isExpanded ? 'auto' : 0,
        overflow: isExpanded ? 'visible' : 'hidden',
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    useEffect(() => {
      if (!rootRef?.current) return;

      // // TODO: fix animation on native and remove all "if" block
      // if (native) {
      //   rootRef.current.setNativeProps({ height: isExpanded ? 'auto' : 0 });
      //   return;
      // }

      (async () => {
        const metrics = await rect(rootRef.current);
        const size = web ? rootRef.current?.scrollHeight : metrics.height;

        const curSize = isExpanded ? 0 : size;
        const newSize = isExpanded ? size : 0;

        if (newSize === metrics.height) return;

        setNativeStyle(rootRef.current, {
          overflow: 'hidden',
        });

        await transition.start({
          throttle: 0,
          web_useRawStyle: true,
          from: { height: curSize },
          to: { height: newSize },
        });

        if (newSize > 0) {
          setNativeStyle(rootRef.current, {
            height: 'auto',
            overflow: 'visible',
          });
        }
      })();
    }, [rootRef, isExpanded, transition, web, native]);

    return (
      <BoxFactory
        noRootStyles
        {...transition.props}
        platform={{ native: { collapsable: false } }}
        style={initialStyle}
        stylist={[variants.root, stylist]}
        rawStyle={transition.props.style}
      >
        <BoxFactory {...rest} />
      </BoxFactory>
    );
  }),
);

CollapseFactory.displayName = 'CollapseFactory';

export default CollapseFactory;
