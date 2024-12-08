import {
  Channel,
  ChannelType,
  Member,
  MemberRole,
  Profile,
  Server,
} from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import React from "react";

// Define the valid endpoint types
export type EndpointType = "messageFile" | "serverImage";

// Correct the ImageUploadProp interface
export interface ImageUploadProp {
  onChange: (url?: string) => void;
  value: string;
  endpoint: EndpointType; // Reference the valid endpoint types
}

export interface UploadedFile {
  fileUrl: string;
}

export interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export interface ServerSidebarProps {
  serverId: string;
}

export interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel";

export interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
}

export interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data: ModalData) => void;
  onClose: () => void;
}

export interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

export interface UserAvatarProps {
  src?: string;
  className?: string;
}

export interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}
export interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}
export interface ServerMemberProp {
  member: Member & { profile: Profile };
  server: Server;
}

export interface ServeIdPageProps {
  params: {
    serverId: string;
  };
}

export interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

export interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}
export interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};
