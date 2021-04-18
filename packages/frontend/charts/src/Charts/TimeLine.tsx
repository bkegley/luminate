import React from 'react';
import * as d3 from 'd3';
import { Chart, useChartDimensions } from '../Primitives';
import { LineChartData } from '../types';
import { Gradient } from '../Primitives/Gradient';

const formatDate = d3.timeFormat('%-b %-d');

export interface TimelineProps {
  data: LineChartData;
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

  const allCoords = data.lines.reduce(
    (acc, line) => acc.concat(line.data),
    [] as [number, number][]
  );

  const xScale = d3
    .scaleTime()
    // @ts-ignore
    .domain(d3.extent(allCoords, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    // @ts-ignore
    .domain(d3.extent(allCoords, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d: any) => xScale(xAccessor(d));
  const yAccessorScaled = (d: any) => yScale(yAccessor(d));
  const y0AccessorScaled = yScale(yScale.domain()[0]);

  return (
    <Chart dimensions={dimensions} ref={ref}>
      <Chart.Axis
        axis="x"
        scale={xScale}
        formatTick={formatDate}
        numberOfTicks={20}
      />
      <Chart.Axis axis="y" scale={yScale} label={label} />
      {data.lines.map((line, index) => {
        const color = line.color ?? 'text-secondary-600';
        const gradientId = `gradient-${data.id}-${index}`;
        return (
          <>
            {line.type === 'area' ? (
              <>
                <defs className={color}>
                  <Gradient
                    id={gradientId}
                    colors={['currentColor', 'white']}
                    x2="0"
                    y2="100%"
                  />
                </defs>
                <Chart.Line
                  type="area"
                  data={line}
                  xAccessor={xAccessorScaled}
                  yAccessor={yAccessorScaled}
                  y0Accessor={y0AccessorScaled}
                  style={{ fill: `url(#${gradientId})` }}
                />
              </>
            ) : null}
            <Chart.Line
              className={`stroke-current stroke-2 ${color}`}
              fill="none"
              data={line}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
            />
          </>
        );
      })}
    </Chart>
  );
};
