import React from 'react';
import { ChartContext } from './Chart';

export const _useDimensions = () => {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error('useDimensionsContext must be used inside a Chart');
  }
  return context;
};
