import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import Platform from '../Platform';
import RbkContext from '../RbkContext';
import pointer from '../events/pointer';
import { RbkPointerEvent } from '../types';

export type UseDraggableProps = {
  onDragStart?: (event: RbkPointerEvent) => void;
  onDragMove?: (event: RbkPointerEvent) => void;
  onDragEnd?: (event: RbkPointerEvent) => void;
};

export default function useDraggable({ onDragStart, onDragMove, onDragEnd }: UseDraggableProps = {}) {
  const { setDraggable } = useContext(RbkContext);

  const [isCapturing, setIsCapturing] = useState(false);

  const capture = useCallback(() => {
    setIsCapturing(true);
  }, []);

  const release = useCallback(() => {
    setIsCapturing(false);
    setDraggable(undefined);
  }, [setDraggable]);

  useEffect(() => {
    if (!Platform.web) return;
    if (!isCapturing) return;

    let startEventDispatched = false;

    setDraggable({
      onPointerMove: (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (startEventDispatched) {
          onDragMove?.(e);
        } else {
          startEventDispatched = true;
          onDragStart?.(e);
        }
      },
      onPointerUp: (e) => {
        e.preventDefault();
        e.stopPropagation();

        startEventDispatched = false;
        onDragEnd?.(pointer(e));
      },
      onPointerCancel: (e) => {
        e.preventDefault();
        e.stopPropagation();

        startEventDispatched = false;
        onDragEnd?.(pointer(e));
      },
    });
  }, [isCapturing, setDraggable]);

  useEffect(() => {
    if (!Platform.native) return;
    if (!isCapturing) return;

    setDraggable({
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: () => true,
      onResponderGrant: (e) => {
        e.preventDefault();
        e.stopPropagation();

        onDragStart?.(pointer(e));
      },
      onResponderMove: (e) => {
        e.preventDefault();
        e.stopPropagation();

        onDragMove?.(pointer(e));
      },
      onResponderRelease: (e) => {
        e.preventDefault();
        e.stopPropagation();

        onDragEnd?.(pointer(e));
      },
      onResponderTerminate: (e) => {
        e.preventDefault();
        e.stopPropagation();

        onDragEnd?.(pointer(e));
      },
    });
  }, [isCapturing, setDraggable]);

  return useMemo(
    () => ({
      capture,
      release,
      isCapturing,
    }),
    [capture, release, isCapturing],
  );
}
