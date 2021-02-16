import React from "react";

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
      <div className="lg:hidden">
        <label htmlFor="selected-tab" className="sr-only">
          Select a tab
        </label>
        <select
          id="selected-tab"
          name="selected-tab"
          onChange={(e) => setActiveTab(e.currentTarget.value)}
          value={activeTab}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
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
      <div className="hidden lg:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
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
                  className={`${
                    tab === activeTab
                      ? "focus-none border-orange-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  }`}
                  aria-current={tab === activeTab ? "true" : "false"}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
      {children ? children({ activeTab }) : null}
    </>
  );
};
