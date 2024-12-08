// app/api/socket/route.ts
import { Server } from "socket.io";
import { NextRequest } from "next/server";
import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";

export async function GET(request: NextRequest) {
  // Ensure the socket server is only created once
  if (!global.io) {
    // Check if running in a server environment
    if (typeof window === "undefined") {
      const httpServer =
        global.httpServer || (global.httpServer = new NetServer());

      const io = new ServerIO(httpServer, {
        path: "/api/socket/io",
        addTrailingSlash: false,
        cors: {
          origin: [
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            "http://localhost:3000",
          ],
          methods: ["GET", "POST"],
        },
      });

      // Store the io instance globally to prevent multiple initializations
      global.io = io as any;
    }
  }

  // Return a response to satisfy the route handler
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: NextRequest) {
  // Ensure the socket server is only created once
  if (!global.io) {
    // Check if running in a server environment
    if (typeof window === "undefined") {
      const httpServer =
        global.httpServer || (global.httpServer = new NetServer());

      const io = new ServerIO(httpServer, {
        path: "/api/socket/io",
        addTrailingSlash: false,
        cors: {
          origin: [
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            "http://localhost:3000",
          ],
          methods: ["GET", "POST"],
        },
      });

      // Store the io instance globally to prevent multiple initializations
      global.io = io as any;
    }
  }

  // Return a response to satisfy the route handler
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
