"use client";

import { useState } from "react";
import HotProductsTab from "./HotProductsTab";
import NewProductsTab from "./NewProductsTab";
import ComingSoonTab from "./ComingSoonTab";

const tabs = [
  { id: "hot", label: "محصولات پرفروش" },
  { id: "new", label: "تازه‌های بازار" },
  { id: "deals", label: "پیشنهادات ویژه" },
  { id: "sale", label: "حراج فصل" },
];

export default function TabbedContent() {
  const [activeTab, setActiveTab] = useState("hot");

  return (
    <div className="max-w-7xl mx-auto py-8 px-4" dir="rtl">
      <div className="flex overflow-x-auto border-b mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap",
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "hot" && <HotProductsTab />}
      {activeTab === "new" && <NewProductsTab />}
      {(activeTab === "deals" || activeTab === "sale") && <ComingSoonTab />}
    </div>
  );
}

const cn = (...classes: string[]) => classes.filter(Boolean).join(" "); 