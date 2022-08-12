import { forwardRef, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { CollapseFactory, CollapseProps, merge } from '@react-bulk/core';

import useMap from '../useMap';

function Collapse({ in: shown, ...props }: CollapseProps, ref) {
  const map = useMap();

  const containerRef = useRef<any>(null);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const [height, setHeight] = useState(null);

  const isReady = height !== null && height > 0;

  useEffect(() => {
    if (height === null) return;

    Animated.timing(heightAnim, {
      toValue: shown ? height : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [shown, height]);

  const handleLayout = ({ nativeEvent }) => {
    setHeight((current: any) => Math.max(current, nativeEvent.layout.height) as any);
  };

  return (
    <Animated.View ref={containerRef} style={merge(isReady && { height: heightAnim })} onLayout={handleLayout}>
      <CollapseFactory
        ref={ref}
        {...props}
        accessibility={{
          state: { expanded: shown },
        }}
        map={map}
      />
    </Animated.View>
  );
}

export default forwardRef<typeof Collapse, CollapseProps>(Collapse);
