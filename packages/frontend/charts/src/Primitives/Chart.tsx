import React from 'react';
import { IDimensions } from '../types';
import { Axis } from './Axis';
import { Line } from './Line';

export const ChartContext = React.createContext<IDimensions | undefined>(
  undefined
);

export interface ChartProps {
  dimensions: IDimensions;
  center?: boolean;
  children: React.ReactNode;
}

interface Chart
  extends React.ForwardRefExoticComponent<
    ChartProps & React.RefAttributes<HTMLDivElement>
  > {
  Axis: typeof Axis;
  Line: typeof Line;
}

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ dimensions, center, children }, ref) => {
    return (
      <div className="w-full h-full" ref={ref}>
        <ChartContext.Provider value={dimensions}>
          <svg
            width={dimensions.width}
            height={dimensions.height}
            viewBox={
              center
                ? `-${dimensions.width / 2} -${dimensions.height / 2} ${
                    dimensions.width
                  } ${dimensions.height}`
                : undefined
            }
          >
            <g
              transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
            >
              {children}
            </g>
          </svg>
        </ChartContext.Provider>
      </div>
    );
  }
) as Chart;

Chart.Axis = Axis;
Chart.Line = Line;
