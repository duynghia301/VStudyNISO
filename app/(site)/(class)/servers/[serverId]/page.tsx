import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const ServerIdPage = async ({
  params,
}: {
  params: Promise<{ serverId: string }>;
}) => {
  const resolvedParams = await params;
  const profile = await currentProfile();

  if (!profile) {
    return <RedirectToSignIn />;
  }

  const server = await db.server.findUnique({
    where: {
      id: resolvedParams.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      chanel: {
        where: {
          name: "general",
        },
        orderBy: {
          creeatedAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.chanel[0];

  if (initialChannel?.name !== "general") {
    return null;
  }
  redirect(`/servers/${resolvedParams.serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;