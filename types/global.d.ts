import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

declare global {
  var io: ServerIO | undefined;
  var httpServer: NetServer | undefined;
}

export {};