import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ inviteCode: string }> }) {
  const resolvedParams = await params;
  const profile = await currentProfile();

  if (!profile) {
    redirect("/sign-in");
  }

  const inviteCode = resolvedParams.inviteCode;
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
}