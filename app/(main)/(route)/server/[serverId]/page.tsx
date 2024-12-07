import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServeIdPageProps } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

const ServerIdPage = async ({ params }: ServeIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];
  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/server/${params.serverId}/channel/${initialChannel?.id}`);
};

export default ServerIdPage;
