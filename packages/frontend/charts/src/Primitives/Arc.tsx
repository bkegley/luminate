import React from 'react';
import * as d3 from 'd3';
import { _useDimensions } from './_useDimensions';

export interface Datum {
  name: string;
  value: number;
  color?: string;
}

export interface ArcProps {
  datum: d3.PieArcDatum<Datum>;
  color?: string;
}

export const Arc = ({ datum, color }: ArcProps) => {
  const { width, height } = _useDimensions();
  const arc = d3
    .arc<d3.PieArcDatum<Datum>>()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);

  return (
    <g>
      <path className={`fill-current ${color}`} d={arc(datum) ?? undefined} />
    </g>
  );
};
