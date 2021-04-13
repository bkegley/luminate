import React from 'react';
import PropTypes from 'prop-types';

export interface GradientProps
  extends React.SVGProps<SVGLinearGradientElement> {
  id: string;
  colors: string[];
}

const Gradient = ({ id, colors, ...props }: GradientProps) => (
  <linearGradient
    id={id}
    gradientUnits="userSpaceOnUse"
    spreadMethod="pad"
    {...props}
  >
    {colors.map((color, i) => (
      <stop offset={`${(i * 100) / (colors.length - 1)}%`} stopColor={color} />
    ))}
  </linearGradient>
);

Gradient.propTypes = {
  id: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default Gradient;
