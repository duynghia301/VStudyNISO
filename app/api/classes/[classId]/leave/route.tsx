import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Đúng kiểu Next.js 15: params là Promise
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ classId: string }> }
) {
  try {
    const resolvedParams = await params;
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!resolvedParams.classId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: resolvedParams.classId,
        profilleId: { not: profile.id }, 
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_LEAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}