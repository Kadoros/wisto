import { ChatHeaderProps } from "@/types";

import { Hash, Mic, Video } from "lucide-react";
import React from "react";
import MoblieToggle from "@/components/global/moblie-toggle";

const ChatHeader = ({ name, serverId, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MoblieToggle serverId={serverId} />
      {type == "channel" && (
        <Hash className={"w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2"} />
      )}
      <p className="font-semibold text-muted text-black dark:text-white">
        {name}
      </p>
    </div>
  );
};

export default ChatHeader;
