import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import Platform from '../Platform';
import RbkContext from '../RbkContext';
import pointer from '../events/pointer';
import { RbkPointerEvent } from '../types';
import event from '../utils/event';

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

    const removePointerStart = event(
      document,
      'pointermove',
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onDragStart?.(pointer(e));
      },
      { once: true },
    );

    const removePointerMove = event(document, 'pointermove', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDragMove?.(pointer(e));
    });

    const removePointerUp = event(document, 'pointerup', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDragEnd?.(pointer(e));
    });

    const removePointerCancel = event(document, 'pointercancel', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDragEnd?.(pointer(e));
    });

    return () => {
      removePointerStart();
      removePointerMove();
      removePointerUp();
      removePointerCancel();
    };
  }, [isCapturing]);

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
