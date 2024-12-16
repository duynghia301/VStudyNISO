import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/ui/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { ChanelType } from "@prisma/client";
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
            {channel.type === ChanelType.TEXT &&(

                <>
                    <ChatMessages
            
                        name={channel.name}
                        member={member}
                        chatId={channel.id}
                        type="channel"
                        apiUrl="/api/messages"
                        socketUrl="/api/socket/messages"
                        socketQuery={{
                            channelId:channel.id,
                            serverId: channel.serverId,
                        }}
                        paramKey="channelId"
                        paramValue={channel.id}
                    />
                    <ChatInput  
                        name={channel.name}
                        type="chanel"
                        apiUrl="/api/socket/messages"
                        query={{
                            channelId:channel.id,
                            serverId: channel.serverId,
                        }}
                    />   
                </>
            )}

            {channel.type === ChanelType.AUDIO &&(
                <MediaRoom
                    chatId={channel.id}
                    video={false}
                    audio={true}
                />

            )}
            {channel.type === ChanelType.VIDEO &&(
                <MediaRoom
                    chatId={channel.id}
                    video={true}
                    audio={true}
                />
                
            )}
        </div>
     );
}
 
export default ChannelIdPage;