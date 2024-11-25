import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";
import { ClassHeader } from "./class-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSearch } from "./class-search";
import { ChanelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, VideoIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ClassSection } from "./class-section";
import { ClassChanel } from "./class-channel";
import { ClassMemeber } from "./class-member";

interface CLassSideBarProps{
    serverId:string;
}

const iconMap={
   [ ChanelType.TEXT]: <Hash className="mr-2 h-4 w-4"/>,
   [ ChanelType.AUDIO]: <Mic className="mr-2 h-4 w-4"/>,
   [ ChanelType.VIDEO]: <VideoIcon className="mr-2 h-4 w-4"/>
}

const roleIconMap={
    [MemberRole.GUEST]:null,
    [MemberRole.MODERATOR]:<ShieldCheck className="mr-2 h-4 w-4 text-indigo-500"/>,
    [MemberRole.ADMIN]:<ShieldAlert className="mr-2 h-4 w-4 text-red-600"/>,

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

    const textChannels =server?.chanel.filter((channel)=>channel.type === ChanelType.TEXT)
    const audioChannels =server?.chanel.filter((channel)=>channel.type === ChanelType.AUDIO)
    const videoChannels =server?.chanel.filter((channel)=>channel.type === ChanelType.VIDEO)
    const members = server?.members.filter((member)=>member.profileId !== profile.id)
    
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
            <ScrollArea className="flex-1 px-3 ">
            <div className="mt-2 text-black">
                <ServerSearch
                data={[
                    {
                        label: "Text Channels",
                        type:"channel",
                        data: textChannels?.map((channel)=>({
                            id: channel.id,
                            name:channel.name,
                            icon:iconMap[channel.type],
                        }))
                    },
                    {
                        label: "Voice Channels",
                        type:"channel",
                        data: audioChannels?.map((channel)=>({
                            id: channel.id,
                            name:channel.name,
                            icon:iconMap[channel.type],
                        }))
                    },
                    {
                        label: "Video Channels",
                        type:"channel",
                        data: videoChannels?.map((channel)=>({
                            id: channel.id,
                            name:channel.name,
                            icon:iconMap[channel.type],
                        }))
                    },
                    {
                        label: "Members",
                        type:"member",
                        data: members?.map((member)=>({
                            id: member.id,
                            name:member.profile.name,
                            icon:roleIconMap[member.role],
                        }))
                    }
                ]}
                />
            </div>

            <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
            {!!textChannels?.length && (
                <div className="mb-2">
                    <ClassSection
                        sectionType="channel"
                        channelType={ChanelType.TEXT}
                        role={role}
                        label="Text Channels"
                    />
                    <div className="space-y-[2px]">
                        {textChannels?.map((channel)=>(
                            <ClassChanel
                            key={channel.id}
                            channel={channel}
                            role={role}
                            server={server}
                            />
                        ))}
                    </div>
                </div>
                
            )}
            
             {!!audioChannels?.length && (
                <div className="mb-2">
                    <ClassSection
                        sectionType="channel"
                        channelType={ChanelType.AUDIO}
                        role={role}
                        label="Voice Channels"
                    />
                    <div className="space-y-[2px]">
                        {audioChannels?.map((channel)=>(
                            <ClassChanel
                            key={channel.id}
                            channel={channel}
                            role={role}
                            server={server}
                            />
                        ))}
                    </div>
                </div>
                
            )}
            {!!videoChannels?.length && (
                <div className="mb-2">
                    <ClassSection
                        sectionType="channel"
                        channelType={ChanelType.VIDEO}
                        role={role}
                        label="Video Channels"
                    />
                    <div className="space-y-[2px]">
                        {videoChannels?.map((channel)=>(
                            <ClassChanel
                            key={channel.id}
                            channel={channel}
                            role={role}
                            server={server}
                            />
                        ))}
                    </div>
                </div>
                
            )}
            {!!members?.length && (
                <div className="mb-2">
                    <ClassSection
                        sectionType="member"
               
                        role={role}
                        label="Memebers"
                        server={server}
                    />
                    <div className="space-y-[2px]">
                        {members?.map((member)=>(
                            <ClassMemeber
                            key={member.id}
                            member={member}
                            server={server}
                            />

                        ))}
                    </div>
                </div>
                
            )}
           
            </ScrollArea>
        </div>
    )
}