import {Server, Profile, Member, ChanelType } from "@prisma/client"

export type ServerWithMemberWithProfile = Server & {
    member: (Member & {profile:Profile})[];
    chanel:{
        name:string;
        id:string;
        createdAt: Date;
        updatedAt: Date;
        type: ChanelType;
        serverId: string;
        profileId: string;
    }[]
};