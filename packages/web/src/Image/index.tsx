import React, { forwardRef, useMemo } from 'react';

import { ImageFactory, ImageProps } from '@react-bulk/core';

const Image = React.memo<ImageProps>(
  forwardRef(({ source, circular, style, ...props }, ref) => {
    style = [circular && { borderRadius: '50%' }, style];

    // @ts-ignore
    props.src = useMemo(() => source?.uri ?? source, [source]);

    return <ImageFactory ref={ref} {...props} style={style} />;
  }),
);

Image.displayName = 'Image';

export default Image;
