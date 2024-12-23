import {Server as NetServer,Socket} from "net"
import { NextApiResponse } from "next";
import {Server as ServerIOServer} from "socket.io"
import {Server, Profile, Member } from "@prisma/client"

export type ServerWithMemberWithProfile = Server & {
    members: (Member & {profile:Profile})[];
    
};

export type NextApiResponseServerIo = NextApiResponse & {
    socket:Socket &{
        server:NetServer&{
            io:ServerIOServer;
        }
    }
}