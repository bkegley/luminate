import React from 'react';
import { Chart, Arc, useChartDimensions } from '../Primitives';
import { ArcDatum } from '../Primitives/Arc';
import { useArcs } from '../Primitives/useArcs';

export interface PieProps {
  data: Array<ArcDatum>;
}

export const Pie = ({ data }: PieProps) => {
  const [ref, dimensions] = useChartDimensions({ marginLeft: 0, marginTop: 0 });
  const arcs = useArcs(data);

  return (
    <Chart ref={ref} dimensions={dimensions} center>
      {arcs.map((datum) => {
        return (
          <Arc key={datum.data.name} datum={datum} color={datum.data.color} />
        );
      })}
    </Chart>
  );
};
