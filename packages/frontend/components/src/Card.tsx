import React from 'react';
import { Button, ButtonProps } from './Button';
import { Heading } from './Heading';

const CardContext = React.createContext({});

export interface CardAction {
  text: string;
  onClick: () => void;
  variant?: ButtonProps['variant'];
  as?: React.ElementType;
}

export interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <CardContext.Provider value={{}}>
      <div className="shadow sm:rounded-md sm:overflow-hidden bg-white dark:bg-gray-900">
        {children}
      </div>
    </CardContext.Provider>
  );
};

interface CardTitleProps {
  title?: string;
  subtitle?: string;
  id?: string;
  primaryAction?: CardAction;
  children?: React.ReactNode;
}

const Title = ({
  children,
  title,
  subtitle,
  id,
  primaryAction,
}: CardTitleProps) => {
  const context = React.useContext(CardContext);
  if (!context) {
    throw new Error('Card.Title must be wrapped in a Card component');
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          {title ? (
            <Heading as="h3" id={id ?? undefined}>
              {title}
            </Heading>
          ) : null}
          {subtitle ? (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          ) : null}
        </div>
        {primaryAction ? (
          <div>
            <Button
              variant={primaryAction.variant}
              onClick={primaryAction.onClick}
              as={primaryAction.as}
            >
              {primaryAction.text}
            </Button>
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
}

const Content = ({ children }: CardContentProps) => {
  const context = React.useContext(CardContext);
  if (!context) {
    throw new Error('Card.Content must be wrapped in a Card component');
  }

  return <div className="px-4 py-6 sm:px-6">{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
}

const Footer = ({ children }: CardFooterProps) => {
  const context = React.useContext(CardContext);
  if (!context) {
    throw new Error('Card.Footer must be wrapped in a Card component');
  }

  return (
    <div className="px-4 py-3 sm:px-6 bg-gray-50 dark:bg-gray-700">
      {children}
    </div>
  );
};

Card.Title = Title;
Card.Content = Content;
Card.Footer = Footer;
