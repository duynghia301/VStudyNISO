import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const InviteCodePage = async ({
  params,
}: {
  params: { inviteCode: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/sign-in");
  }

  const inviteCode = params?.inviteCode;
  if (!inviteCode) {
    redirect("/dashboard");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    redirect(`/servers/${existingServer.id}`);
  }

  const updatedServer = await db.server.update({
    where: { inviteCode },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  });

  if (updatedServer) {
    redirect(`/servers/${updatedServer.id}`);
  }

  redirect("/dashboard");
};

export default InviteCodePage;
