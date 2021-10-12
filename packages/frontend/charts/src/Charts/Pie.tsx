import React from 'react';
import * as d3 from 'd3';
import { Chart, Arc, useChartDimensions } from '../Primitives';
import { Datum } from '../Primitives/Arc';

export interface PieChartProps {
  data: Array<Datum>;
}

export const PieChart = ({ data }: PieChartProps) => {
  const [ref, dimensions] = useChartDimensions({ marginLeft: 0, marginTop: 0 });

  const arcs = React.useMemo(() => {
    const createArcs = d3
      .pie<Datum>()
      .sort(null)
      .value((d) => d.value);

    return createArcs(data);
  }, [data]);

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
