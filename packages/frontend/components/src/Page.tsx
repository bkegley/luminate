import React from 'react';
import { Button, ButtonProps } from './Button';
import { Heading } from './Heading';

export interface PageAction {
  text: string;
  onClick: () => void;
  variant?: ButtonProps['variant'];
  as?: React.ElementType;
}

export interface PageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  primaryAction?: PageAction;
}

export const Page = ({
  title,
  subtitle,
  primaryAction,
  children,
}: PageProps) => {
  return (
    <div className="max-w-4xl lg:max-w-5xl  xl:max-w-7xl mx-auto md:px-8 xl:px-4">
      <div className="pt-10 sm:pt-20 pb-16 px-4 sm:px-6 md:px-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Heading as="h1">{title}</Heading>
            {subtitle ? (
              <p className="ml-4 max-w-2xl text-gray-500">{subtitle}</p>
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
        <div>
          <div className="py-6 sm:py-12">{children}</div>
        </div>
      </div>
    </div>
  );
};
