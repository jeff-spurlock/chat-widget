import type { FC } from "react";
import { Button } from "./ui/button";
import { MessageCircleIcon, SettingsIcon } from "lucide-react";

interface NavigationProps {
  setActivePanel: (panel: "chat" | "settings") => void;
}
export const Navigation: FC<NavigationProps> = ({ setActivePanel }) => {
  return (
    <nav className="flex gap-2 justify-between border border-gray-800 rounded-t-md px-2">
      <div className="flex justify-start"><Button variant="ghost" onClick={() => setActivePanel("chat")}><MessageCircleIcon /><span className="sr-only">Chat</span></Button></div>
      <Button variant="ghost" onClick={() => setActivePanel("settings")}><SettingsIcon /><span className="sr-only">Settings</span></Button>
    </nav>
  );
};