import { forwardRef, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { CollapseProps, createCollapse, sleep } from '@react-bulk/core';

import map from '../map';

const Collapse = forwardRef(({ in: shown, ...props }: CollapseProps, ref) => {
  const readyRef = useRef(false);
  const containerRef = useRef<any>(null);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const [animate, setAnimate] = useState(false);
  const [height, setHeight] = useState<any>(null);

  async function getHeight(): Promise<number> {
    return new Promise((resolve) => {
      // @ts-ignore
      containerRef.current.measure(async (x: any, y: any, width: any, height: any, px: any, py: any) => resolve(height));
    });
  }

  useEffect(() => {
    if (!readyRef.current) {
      readyRef.current = true;
      return;
    }

    (async () => {
      let curHeight = await getHeight();
      let newHeight = 0;

      setAnimate(false);
      await sleep(1);

      if (shown) {
        curHeight = 0;
        newHeight = await getHeight();
      }

      heightAnim.setValue(curHeight);
      setHeight(newHeight);

      setAnimate(true);
    })();
  }, [shown]);

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: height as number,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [height]);

  return (
    <Animated.View ref={containerRef} style={animate ? { height: heightAnim } : {}}>
      {createCollapse(props, ref, map)}
    </Animated.View>
  );
});

export default Collapse;
