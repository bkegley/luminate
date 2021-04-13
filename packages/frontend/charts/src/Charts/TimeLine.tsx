import React from 'react';
import * as d3 from 'd3';
import { Chart, useChartDimensions } from '../Primitives';

const formatDate = d3.timeFormat('%-b %-d');

export interface TimelineProps {
  data?: any;
  xAccessor: (d: TimelineProps['data']) => number;
  yAccessor: (d: TimelineProps['data']) => number;
  label?: string;
}

export const Timeline = ({
  data,
  xAccessor,
  yAccessor,
  label,
}: TimelineProps) => {
  const [ref, dimensions] = useChartDimensions();

  const xScale = d3
    .scaleTime()
    // @ts-ignore
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    // @ts-ignore
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d: any) => xScale(xAccessor(d));
  const yAccessorScaled = (d: any) => yScale(yAccessor(d));

  return (
    <Chart dimensions={dimensions} ref={ref}>
      <Chart.Axis
        axis="x"
        scale={xScale}
        formatTick={formatDate}
        numberOfTicks={20}
      />
      <Chart.Axis axis="y" scale={yScale} label={label} />
      <Chart.Line
        className="stroke-current text-secondary-600 stroke-2"
        fill="none"
        data={data}
        xAccessor={xAccessorScaled}
        yAccessor={yAccessorScaled}
      />
    </Chart>
  );
};
