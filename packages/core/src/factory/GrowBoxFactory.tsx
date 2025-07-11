import React, { forwardRef, useEffect, useRef } from 'react';

import getFullSize from '../element/getFullSize';
import setNativeStyle from '../element/setNativeStyle';
import useAnimation from '../hooks/useAnimation';
import useDefaultRef from '../hooks/useDefaultRef';
import useTheme from '../hooks/useTheme';
import factory2 from '../props/factory2';
import jss from '../styles/jss';
import { GrowBoxProps } from '../types';
import global from '../utils/global';
import BoxFactory from './BoxFactory';

const GrowBoxFactory = React.memo<GrowBoxProps>(
  forwardRef(({ ref, children, ...props }, legacyRef) => {
    ref = ref || legacyRef;

    const theme = useTheme();
    const options = theme.components.GrowBox;
    const { native } = global.mapping;

    // Extends from default props
    const {
      duration,
      // Styles
      variants,
      style,
      ...rest
    } = factory2<GrowBoxProps>(props, options);

    const rootRef = useDefaultRef(ref);

    const transition = useAnimation(
      {
        ...jss(style),
        height: 0,
        width: 0,
      },
      rootRef,
    );

    useEffect(() => {
      if (!rootRef.current) return;

      (async () => {
        const { height, width } = await getFullSize(rootRef.current);

        await transition.start({
          duration,
          to: { height, width },
        });

        setNativeStyle(rootRef.current, {
          height: 'auto',
          width: 'auto',
        });
      })();
    }, [rootRef, children, duration, native, transition]);

    return (
      <BoxFactory {...transition.props} variants={{ root: variants.root }} {...rest}>
        {children}
      </BoxFactory>
    );
  }),
);

GrowBoxFactory.displayName = 'GrowBoxFactory';

export default GrowBoxFactory;
