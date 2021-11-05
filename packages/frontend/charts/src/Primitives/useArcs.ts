import React from 'react';
import * as d3 from 'd3';
import { ArcDatum } from './Arc';

export const useArcs = (data: Array<ArcDatum>) =>
  React.useMemo(() => {
    const createArcs = d3
      .pie<ArcDatum>()
      .sort(null)
      .value((d) => d.value);

    return createArcs(data);
  }, [data]);
