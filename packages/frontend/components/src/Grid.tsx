import React from 'react';

const GridContext = React.createContext({});

export interface GridProps {
  children: React.ReactNode;
}

export const Grid = ({ children }: GridProps) => {
  return (
    <GridContext.Provider value={{}}>
      <div className="w-full grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3 relative">
        {children}
      </div>
    </GridContext.Provider>
  );
};

interface GridLeftProps {
  children: React.ReactNode;
}

const Left = ({ children }: GridLeftProps) => {
  const context = React.useContext(GridContext);
  if (!context) {
    throw new Error('Grid.Left must be wrapped in a Grid component');
  }
  return <div className="lg:col-start-1 lg:col-span-2">{children}</div>;
};

interface GridRightProps {
  sticky?: boolean;
  children: React.ReactNode;
}

const Right = ({ children, sticky = false }: GridRightProps) => {
  const context = React.useContext(GridContext);
  if (!context) {
    throw new Error('Grid.Right must be wrapped in a Grid component');
  }
  return (
    <div
      className={`lg:col-start-3 lg:col-span-1 ${sticky ? 'sticky top-0' : ''}`}
    >
      {children}
    </div>
  );
};

Grid.Left = Left;
Grid.Right = Right;
