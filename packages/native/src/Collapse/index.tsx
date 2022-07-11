import { forwardRef, useEffect, useRef, useState } from 'react';
import { Animated, ViewProps } from 'react-native';

import { CollapseProps, sleep } from '@react-bulk/core';
import CollapseFactory from '@react-bulk/core/src/factory/CollapseFactory';

import useMap from '../useMap';

export type CollapsePropsNative = ViewProps & CollapseProps;

function Collapse({ in: shown, ...props }: CollapsePropsNative, ref) {
  const map = useMap();

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
      <CollapseFactory ref={ref} {...props} map={map} />
    </Animated.View>
  );
}

export default forwardRef(Collapse);
