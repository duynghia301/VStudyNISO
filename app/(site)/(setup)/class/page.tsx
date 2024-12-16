import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/models/initial-modal";

const SetUpPage = async () => {
  const profile = await initialProfile();

  if ('id' in profile) { // Kiểm tra nếu profile có thuộc tính `id`
    const server = await db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (server) {
      return redirect(`servers/${server.id}`);
    }
  }

  return <InitialModal/>;
};

export default SetUpPage;
