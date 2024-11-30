import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps{
    params:{
        serverId:string;
        channelId:string
    }
}



const ChannelIdPage = async({
    params
}:ChannelIdPageProps) => {

    const profile = await currentProfile();
    const param = await params;
    if(!profile){
        return RedirectToSignIn
    }

    const channel = await db.chanel.findUnique({
        where:{
            id:param.channelId,
        }
    })
    
    const member =await db.member.findFirst({
        where:{
            serverId : param.serverId,
            profileId:profile.id,
        }
    })
    if(!channel || !member){
        redirect("/class")
    }
    return ( 
        <div className="flex flex-col h-full bg-sky-200 dark:bg-[#313338]   ">
            <ChatHeader
                name= {channel.name}
                serverId= {channel.serverId}
                type= "channel"
            />
            <div className="flex-1">Future message</div>
            <ChatInput  
                name={channel.name}
                type="chanel"
                apiUrl="/api/socket/messages"
                query={{
                    channelId:channel.id,
                    serverId: channel.serverId,
                }}
            />
        </div>
     );
}
 
export default ChannelIdPage;