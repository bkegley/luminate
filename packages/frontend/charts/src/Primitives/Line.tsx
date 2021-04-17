import React from 'react';
import * as d3 from 'd3';
import { Accessor, LineData } from '../types';

export interface LineProps extends React.SVGProps<SVGPathElement> {
  type?: 'line' | 'area';
  data: LineData;
  // TODO: fix accessor types
  xAccessor: Accessor;
  yAccessor: Accessor;
  y0Accessor?: Accessor;
  interpolation?: any;
}

export const Line = ({
  type = 'line',
  data,
  xAccessor,
  yAccessor,
  y0Accessor = 0,
  interpolation = d3.curveMonotoneX,
  ...props
}: LineProps) => {
  // TODO: These shouldn't be ignored
  // @ts-ignore
  const lineGenerator = d3[type]()
    // @ts-ignore
    .x(xAccessor)
    // @ts-ignore
    .y(yAccessor)
    .curve(interpolation);

  if (type === 'area') {
    lineGenerator.y0(y0Accessor).y1(yAccessor);
  }

  return (
    <path className="stroke-current" {...props} d={lineGenerator(data.data)} />
  );
};
