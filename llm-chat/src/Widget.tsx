'use client'
import { useState, type FC } from 'react';
import Chat from './panels/Chat';
import Settings from './panels/Settings';
import React from 'react';
import { Button } from './components/ui/button';
import { MessageCircleIcon, SettingsIcon } from 'lucide-react';
import { Navigation } from './components/Navigation';

const Panels = {
  chat: Chat,
  settings: Settings,
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

