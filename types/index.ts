import { Member, MemberRole, Profile, Server } from "@prisma/client";

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
  | "createChannel";

export interface ModalData {
  server?: Server;
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
