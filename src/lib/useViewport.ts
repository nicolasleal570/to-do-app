import { useState, useEffect } from 'react';

export enum UseViewportSizeVariants {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

const getViewport = (): UseViewportSizeVariants => {
  const viewportWidth = document.getElementsByTagName('html')[0].offsetWidth;

  if (viewportWidth < 640) {
    return UseViewportSizeVariants.sm;
  }
  if (viewportWidth < 768) {
    return UseViewportSizeVariants.md;
  }
  if (viewportWidth < 1024) {
    return UseViewportSizeVariants.lg;
  }

  return UseViewportSizeVariants.xl;
};

interface UseViewportReturnType {
  viewport: UseViewportSizeVariants;
}

export default function useViewport(): UseViewportReturnType {
  const [viewport, setViewport] = useState<UseViewportSizeVariants>(
    getViewport()
  );
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
