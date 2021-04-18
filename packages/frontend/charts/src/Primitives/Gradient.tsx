import React from 'react';

export interface GradientProps
  extends React.SVGProps<SVGLinearGradientElement> {
  id: string;
  colors: string[];
}

export const Gradient = ({ id, colors, ...props }: GradientProps) => (
  <linearGradient
    id={id}
    gradientUnits="userSpaceOnUse"
    spreadMethod="pad"
    {...props}
  >
    {colors.map((color, i) => (
      <stop
        offset={`${(i * 100) / (colors.length - 1)}%`}
        stopColor={color}
        stop-opacity={i === 0 ? 0.5 : undefined}
      />
    ))}
  </linearGradient>
);
