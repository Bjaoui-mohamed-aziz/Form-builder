// Tab.tsx
import React, { useState } from 'react';

type TabProps = {
  tabs: { label: string; content: React.ReactNode }[];
};

const Tab: React.FC<TabProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 border-b-2 ${
              activeTab === index ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tab;
