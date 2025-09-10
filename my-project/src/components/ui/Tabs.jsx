// src/components/ui/tabs.jsx
import React, { useState } from "react";

export function Tabs({ children, defaultValue, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab, className = "" }) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsTrigger({ children, value, activeTab, setActiveTab, className = "" }) {
  const isActive = activeTab === value;
  return (
    <button
      className={`px-4 py-2 rounded-t-md ${
        isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
      } ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, activeTab, className = "" }) {
  if (activeTab !== value) return null;
  return <div className={`p-4 border-t ${className}`}>{children}</div>;
}
