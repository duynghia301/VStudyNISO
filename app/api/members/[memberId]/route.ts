import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req:Request,
    {params}:{params:Promise<{memberId: string}>}

) {
    try {
            const resolvedParams = await params;

        const profile = await currentProfile();
        const {searchParams}= new URL(req.url)

        const serverId = searchParams.get("serverId")

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }
        if (!resolvedParams.memberId) {
            return new NextResponse("Member ID missing", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profilleId: profile.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: resolvedParams.memberId,
                        profileId: {
                            not: profile.id,
                        
                        }
                      
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc",
                    },
                },
            },
        });
        return NextResponse.json(server);
    } catch (error) {
        console.log("[MEMBERS_id_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
    
}

export async function PATCH(req: Request, { params }: { params:Promise< { memberId: string } >}) {
    try {
        const paramsResolved = await params;
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const url = new URL(req.url);
        const serverId = url.searchParams.get("serverId");

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        const { role } = await req.json();
        if (!role) {
            return new NextResponse("Role missing", { status: 400 });
        }

        if (!paramsResolved.memberId) {
            return new NextResponse("Member ID missing", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profilleId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: paramsResolved.memberId,
                            profileId: {
                                not: profile.id,
                            },
                        },
                        data: {
                            role,
                        },
                    },
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc",
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[MEMBERS_id_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
