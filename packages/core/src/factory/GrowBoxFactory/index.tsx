import React, { forwardRef, useEffect, useRef } from 'react';

import rect from '../../element/rect';
import setNativeStyle from '../../element/setNativeStyle';
import useTheme from '../../hooks/useTheme';
import useTransition from '../../hooks/useTransition';
import factory2 from '../../props/factory2';
import jss from '../../styles/jss';
import { GrowBoxProps } from '../../types';
import global from '../../utils/global';
import sleep from '../../utils/sleep';
import BoxFactory from '../BoxFactory';

const GrowBoxFactory = React.memo<GrowBoxProps>(
  forwardRef(({ children, stylist, ...props }, ref) => {
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

    const defaultRef = useRef();
    const contentRef: any = ref ?? defaultRef;

    const transition = useTransition({ ...jss(style), height: 0, width: 0 }, contentRef);

    useEffect(() => {
      requestAnimationFrame(async () => {
        if (!contentRef.current) return;

        setNativeStyle(contentRef.current, {
          height: 'auto',
          width: 'auto',
        });

        if (native) {
          await sleep(0);
        }

        const { height, width } = await rect(contentRef.current);

        transition.start({
          duration,
          to: { height, width },
        });

        await sleep(duration);

        setNativeStyle(contentRef.current, {
          height: 'auto',
          width: 'auto',
        });
      });
    }, [contentRef, children, duration, native, transition]);

    return (
      <BoxFactory {...transition.props} stylist={[variants.root, stylist]} {...rest}>
        {children}
      </BoxFactory>
    );
  }),
);

GrowBoxFactory.displayName = 'GrowBoxFactory';

export default GrowBoxFactory;
