"use client";

import {
  ReactNode,
  useState,
} from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
}

export default function Tabs({
  tabs,
  defaultTab,
  activeTab,
  onChange,
}: TabsProps) {
  const [internalTab, setInternalTab] =
    useState(
      defaultTab ?? tabs[0]?.id
    );

  const selectedTab =
    activeTab ?? internalTab;

  const handleChange = (
    tabId: string
  ) => {
    setInternalTab(tabId);
    onChange?.(tabId);
  };

  const currentTab = tabs.find(
    (tab) => tab.id === selectedTab
  );

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav
          className="-mb-px flex gap-6 overflow-x-auto"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={() =>
                handleChange(tab.id)
              }
              className={`
                whitespace-nowrap
                border-b-2
                px-1
                py-3
                text-sm
                font-medium
                transition
                ${
                  selectedTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }
                disabled:cursor-not-allowed
                disabled:opacity-50
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-6">
        {currentTab?.content}
      </div>
    </div>
  );
}