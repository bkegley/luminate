import React from 'react';

export interface HeadingProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >,
    'className'
  > {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = ({ as, children, ...remainingProps }: HeadingProps) => {
  return React.createElement(
    as ? as : 'h2',
    { className: `heading ${as}`, ...remainingProps },
    children
  );
};
