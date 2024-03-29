import React, { forwardRef, useMemo, useState } from 'react';

import useTheme from '../../hooks/useTheme';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import { AvatarProps, RequiredSome } from '../../types';
import BoxFactory from '../BoxFactory';
import ImageFactory from '../ImageFactory';

const AvatarFactory = React.memo<AvatarProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Avatar;

    // Extends from default props
    let {
      alt,
      color,
      corners,
      placeholder,
      size,
      source,
      // Styles
      variants,
      style,
      contentStyle,
      ...rest
    } = factory2<RequiredSome<AvatarProps, 'size'>, typeof options>(props, options);

    const [isLoadingImage, setIsLoadingImage] = useState(Boolean(source));

    const sourceKey = useMemo(() => Date.now(), [source]);

    // Remove width and height styles
    extract(['width', 'height', 'minWidth', 'minHeight', 'w', 'h', 'ww', 'hh', 'minw', 'minh'], rest, style);

    const borderRadius = size / 2;

    const absoluteFill = {
      position: 'absolute',
      inset: 0,
    };

    style = [
      style,
      {
        height: size,
        width: size,
        borderRadius,
      },
    ];

    contentStyle = [
      {
        backgroundColor: color,
        borderRadius,
        corners,
      },
      contentStyle,
    ];

    return (
      <BoxFactory ref={ref} stylist={[variants.root, stylist]} style={style} {...rest}>
        <BoxFactory stylist={[variants.content]} style={contentStyle}>
          <BoxFactory center style={absoluteFill}>
            {Boolean(source) && (
              <ImageFactory
                key={sourceKey}
                w={size}
                h={size}
                alt={alt}
                source={source as any}
                onLoad={() => setIsLoadingImage(false)}
                animation={{
                  throttle: 0,
                  timing: 'linear',
                  iterations: 1,
                  from: { opacity: 0 },
                  to: { opacity: isLoadingImage ? 0 : 1 },
                }}
              />
            )}

            {placeholder}
          </BoxFactory>
        </BoxFactory>

        {children}
      </BoxFactory>
    );
  }),
);

AvatarFactory.displayName = 'AvatarFactory';

export default AvatarFactory;
