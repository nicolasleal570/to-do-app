import { useState, useEffect } from 'react';

enum UseViewportSize {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

const getViewport = (): UseViewportSize => {
  const viewportWidth = document.getElementsByTagName('html')[0].offsetWidth;

  if (viewportWidth < 640) {
    return UseViewportSize.sm;
  }
  if (viewportWidth < 768) {
    return UseViewportSize.md;
  }
  if (viewportWidth < 1024) {
    return UseViewportSize.lg;
  }

  return UseViewportSize.xl;
};

interface UseViewportReturnType {
  viewport: UseViewportSize;
}

export default function useViewport(): UseViewportReturnType {
  const [viewport, setViewport] = useState<UseViewportSize>(getViewport());
  const oldResize: (a: UIEvent) => any = window.onresize;
  const onResize = (evt?: UIEvent) => {
    if (evt) {
      oldResize?.(evt);
    }
    return setViewport(getViewport());
  };
  window.onresize = onResize;
  useEffect(() => {
    onResize();
  }, []);

  return { viewport };
}
