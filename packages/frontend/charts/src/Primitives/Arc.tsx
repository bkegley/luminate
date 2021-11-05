import React from 'react';
import * as d3 from 'd3';
import { _useDimensions } from './_useDimensions';

export interface ArcDatum {
  name: string;
  value: number;
  color?: string;
}

export interface ArcProps {
  datum: d3.PieArcDatum<ArcDatum>;
  color?: string;
  innerRadius?: number;
}

export const Arc = ({ datum, color, innerRadius = 0 }: ArcProps) => {
  const { width, height } = _useDimensions();
  const arc = d3
    .arc<d3.PieArcDatum<ArcDatum>>()
    .innerRadius(innerRadius)
    .outerRadius(Math.min(width, height) / 2 - 1);

  return (
    <g>
      <path className={`fill-current ${color}`} d={arc(datum) ?? undefined} />
    </g>
  );
};
