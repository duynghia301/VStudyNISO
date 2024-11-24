import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
// import { ChanelType } from "@prisma/client";
// import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import { ClassHeader } from "./class-header";

interface CLassSideBarProps{
    serverId:string;
}



export const CLassSideBar = async({
    serverId,
}:CLassSideBarProps)=>{

    const profile = await currentProfile();

    if(!profile){
        return redirect("/dashboard");
    }

    const server = await db.server.findUnique({
        where:{
            id:serverId,

        },
        include:{
            chanel:{
                orderBy:{
                    creeatedAt:"asc"
                },
            },
            members:{
                include:{
                    profile:true,

                    },
                    orderBy:{
                        role:"asc",
                    }
                },
                
            }
        }
    ,);

    // const textChannels =server?.chanel.filter((channel)=>channel.type === ChanelType.TEXT)
    // const audioChannels =server?.chanel.filter((channel)=>channel.type === ChanelType.AUDIO)
    // const videoChannels =server?.chanel.filter((channel)=>channel.type === ChanelType.VIDEO)
    // const members = server?.members.filter((member)=>member.profileId !== profile.id)
    
    if(!server){
        return redirect("/dashboard")
        
    }
    const role =server.members.find((members)=>members.profileId=== profile.id)?.role

    return(
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D21] bg-sky-200">
            <ClassHeader  
                server={server}
                // member={members}
                
                role={role}
            />
        </div>
    )
}