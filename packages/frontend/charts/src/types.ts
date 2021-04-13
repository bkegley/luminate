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

type Datum = [number, number];

export type Accessor = ((d: Datum) => number) | number;
