import React from 'react';
import * as d3 from 'd3';
import { _useDimensions } from './_useDimensions';
import { IDimensions } from '../types';

interface AxisTypeProps extends Omit<React.SVGProps<SVGGElement>, 'scale'> {
  dimensions: IDimensions;
  label?: string;
  formatTick: Function;
  numberOfTicks?: number;
  scale?: any;
}

const YAxis = ({
  dimensions,
  label,
  formatTick,
  numberOfTicks,
  scale,
  ...props
}: AxisTypeProps) => {
  const ticks = scale.ticks(numberOfTicks ?? dimensions.boundedHeight / 70);

  return (
    <g {...props}>
      <line className="stroke-current" y2={dimensions.boundedHeight} />

      {ticks.map((tick: any) => (
        <text
          key={tick}
          className="stroke-current fill-current transition-all ease-out"
          dominantBaseline="middle"
          textAnchor="end"
          transform={`translate(-16, ${scale(tick)})`}
        >
          {formatTick(tick)}
        </text>
      ))}

      {label && (
        <text
          textAnchor="middle"
          transform={`translate(-56px, ${
            dimensions.boundedHeight / 2
          }px) rotate(-90deg)`}
        >
          {label}
        </text>
      )}
    </g>
  );
};

const XAxis = ({
  dimensions,
  label,
  formatTick,
  numberOfTicks,
  scale,
  ...props
}: AxisTypeProps) => {
  const ticks = scale.ticks(
    numberOfTicks ?? dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250
  );

  return (
    <g
      style={{ textAnchor: 'middle' }}
      transform={`translate(0, ${dimensions.boundedHeight})`}
      {...props}
    >
      <line className="stroke-current" x2={dimensions.boundedWidth} />

      {ticks.map((tick: any) => {
        // TODO: add option to use render props
        return (
          <text
            key={tick}
            className="stroke-current fill-current transition-all ease-out"
            transform={`translate(${scale(tick)}, 25)`}
          >
            {formatTick(tick)}
          </text>
        );
      })}

      {label && (
        <text
          textAnchor="middle"
          transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
        >
          {label}
        </text>
      )}
    </g>
  );
};

const axisComponentsByDimension = {
  x: XAxis,
  y: YAxis,
};

export interface AxisProps extends Omit<React.SVGProps<SVGGElement>, 'scale'> {
  axis?: 'x' | 'y';
  // TODO: type this
  scale?: Function;
  // TODO: type this
  formatTick?: Function;
  numberOfTicks?: number;
  label?: string;
}

export const Axis = ({
  axis = 'x',
  formatTick = d3.format(','),
  ...props
}: AxisProps) => {
  const dimensions = _useDimensions();
  const Component = axisComponentsByDimension[axis];

  return (
    <Component dimensions={dimensions} formatTick={formatTick} {...props} />
  );
};
