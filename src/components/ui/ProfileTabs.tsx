"use client";

import { useState } from "react";

export default function ProfileTabs({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [activeTab, setLocalTab] = useState("user");

  const handleTabClick = (tab: string) => {
    setLocalTab(tab);
    setActiveTab(tab);
  };

  return (
    <div className="flex space-x-4 border-b">
      <button
        className={`p-3 ${activeTab === "user" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
        onClick={() => handleTabClick("user")}
      >
        User Profile
      </button>
      <button
        className={`p-3 ${activeTab === "company" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
        onClick={() => handleTabClick("company")}
      >
        Company Profile
      </button>
    </div>
  );
}
