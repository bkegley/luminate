export interface IDimensions {
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  boundedWidth: number;
  boundedHeight: number;
}

export type Datum = [number, number];

export type Accessor<T = Datum> = ((d: T) => number) | number;

type ChartType = 'line' | 'bar';

export interface ChartData {
  type: ChartType;
}

export interface LineData {
  data: Datum[];
  type?: 'line' | 'area';
  label?: string;
  color?: string;
}

export interface LineChartData extends ChartData {
  type: 'line';
  lines: LineData[];
}

interface Bar {
  label?: string;
  color?: string;
  data: number;
}

export interface BarChartData extends ChartData {
  type: 'bar';
  bars: Bar[];
}
