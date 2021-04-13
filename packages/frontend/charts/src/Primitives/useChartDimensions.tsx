import React from 'react';
import { IDimensions } from '../types';

const defaultDimensions: Omit<IDimensions, 'boundedWidth' | 'boundedHeight'> = {
  marginTop: 40,
  marginRight: 30,
  marginBottom: 40,
  marginLeft: 75,
  height: 200,
  width: 200,
};

const createChartDimensions = (dimensions?: Partial<IDimensions>) => {
  const dimensionsWithDefaults = {
    ...defaultDimensions,
    ...dimensions,
  };

  return {
    ...dimensionsWithDefaults,
    boundedHeight: Math.max(
      dimensionsWithDefaults.height -
        dimensionsWithDefaults.marginTop -
        dimensionsWithDefaults.marginBottom,
      0
    ),
    boundedWidth: Math.max(
      dimensionsWithDefaults.width -
        dimensionsWithDefaults.marginLeft -
        dimensionsWithDefaults.marginRight,
      0
    ),
  };
};

export const useChartDimensions = (
  dimensions?: Partial<IDimensions>
): [React.MutableRefObject<any>, IDimensions] => {
  const ref = React.useRef<HTMLDivElement | undefined>();

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (dimensions?.width && dimensions?.height) return;

    const element = ref.current;
    // @ts-ignore
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      if (width !== entry.contentRect.width) {
        setWidth(entry.contentRect.width);
      }
      if (height !== entry.contentRect.height) {
        setHeight(entry.contentRect.height);
      }
    });

    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, [height, width, dimensions]);

  return [
    ref,
    createChartDimensions({
      ...dimensions,
      width: dimensions?.width ?? width,
      height: dimensions?.height ?? height,
    }),
  ];
};
