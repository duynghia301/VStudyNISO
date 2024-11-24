import {Server, Profile, Member } from "@prisma/client"

export type ServerWithMemberWithProfile = Server & {
    members: (Member & {profile:Profile})[];
    
};