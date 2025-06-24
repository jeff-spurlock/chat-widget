'use client'
import { useState, type FC } from 'react';
import Chat from './panels/Chat';
import Settings from './panels/Settings';
import React from 'react';

const Panels = {
  chat: Chat,
  settings: Settings,
};

interface NavigationProps {
  setActivePanel: (panel: "chat" | "settings") => void;
}
const Navigation: FC<NavigationProps> = ({ setActivePanel }) => {
  const items = [
    {
      label: 'Chat',
      onClick: () => setActivePanel("chat"),
    },
    {
      label: 'Settings',
      onClick: () => setActivePanel("settings"),
    },
  ];
  return (
    <nav className="flex gap-2">
      {items.map(item => (
        <button key={item.label} onClick={item.onClick} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {item.label}
        </button>
      ))}
    </nav>
  );
};

const Widget: FC = () => {
  const [activePanel, setActivePanel] = useState<"chat" | "settings">("chat");

  return (
    <div>
      <Navigation setActivePanel={setActivePanel} />
      {Panels[activePanel] && React.createElement(Panels[activePanel])}
    </div>
  );
};

export default Widget;

