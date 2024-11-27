import { ChatHeader } from "@/components/chat/chat-header";
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
        <div className="bg-sky-200 dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name= {channel.name}
                serverId= {channel.serverId}
                type= "channel"
            />
        </div>
     );
}
 
export default ChannelIdPage;