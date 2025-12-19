import React from "react";

type TabItem = {
    key: string;
    label: string;
};

interface TabBarProps {
    tabs: TabItem[];
    selectedTab: string;
    setSelectedTab: (key: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, selectedTab, setSelectedTab }) => {
    const calcWidth = (): number => {
        if (typeof window === "undefined") return 448;
        return Math.min(448, window.innerWidth) - 32;
    };

    return (
        <div className="w-full grid grid-cols-2">
            {tabs.map((tab) => (
                <div
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key)}
                    className={`relative cursor-pointer w-full flex items-center justify-center h-12 border-b border-text-200 ${
                        selectedTab === tab.key
                            ? "text-secondary-main font-bold"
                            : "text-text-300"
                    }`}
                >
                    {tab.label}
                    <div
                        style={{ width: selectedTab === tab.key ? calcWidth() / tabs.length : 0 }}
                        className="absolute bottom-0 h-[2px] bg-secondary-main transition-all"
                    />
                </div>
            ))}
        </div>
    );
};

export default TabBar;
