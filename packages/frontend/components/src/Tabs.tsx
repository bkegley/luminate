import React from 'react';

export interface TabsProps {
  tabs: string[];
  initialActiveTab?: string;
  onActiveTabChange?: (activeTab: string) => void;
  children?: (context: { activeTab: string }) => React.ReactNode;
}

export const Tabs = ({
  tabs,
  initialActiveTab = tabs[0],
  onActiveTabChange,
  children,
}: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(initialActiveTab);

  return (
    <>
      <div className="sm:hidden">
        <label htmlFor="selected-tab" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          onChange={(e) => setActiveTab(e.currentTarget.value)}
          value={activeTab}
          className="block w-full focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
        >
          {tabs.map((tab) => {
            return (
              <option key={tab} value={tab}>
                {tab}
              </option>
            );
          })}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => {
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (onActiveTabChange) {
                    onActiveTabChange(tab);
                  }
                }}
                className={`px-3 py-2 font-medium text-sm rounded-md ${
                  tab === activeTab
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-current={tab === activeTab ? 'true' : 'false'}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>
      {children ? children({ activeTab }) : null}
    </>
  );
};
