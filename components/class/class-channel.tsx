"use client"

import { cn } from "@/lib/utils";
import { Chanel, ChanelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, VideoIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "@/components/action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import React from "react";


interface ClassChannelProps{
 
    channel:Chanel;
    role?:MemberRole;
    server?:Server;
};

const iconMap={
   [ ChanelType.TEXT]: Hash,
   [ ChanelType.AUDIO]: Mic,
   [ ChanelType.VIDEO]: VideoIcon,
}

export const ClassChanel =({
    channel,
    role,
    server,
}:ClassChannelProps)=>{
    const {onOpen} = useModal()

    const params =useParams();
    const router = useRouter();

    const Icon = iconMap[channel.type]    
    
    const onClick =()=> {
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
    }
    const onAction = (e:React.MouseEvent, action:ModalType)=>{
        e.stopPropagation();
        onOpen(action,{channel,server})
    }
    return(
        <button
        onClick={onClick}
        className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
            params?.channelId=== channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
        )}
        
        >
            <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500
            dark:text-zinc-400"/>
            <p className={cn(
                "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params?.channelId=== channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white     "    
                
                )}>
                {channel.name}
            </p>
            {channel.name !=="general"&& role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip lable="Chỉnh sửa">
                        <Edit 
                        onClick={(e)=>onAction(e,"editChannel")}
                        className="hidden group-hover:block h-4 w-4 text-zinc-500
                        hover:text-zinc-600 dark:text-zinc-400
                        dark:hover:text-zinc-300 transition"/>

                    </ActionTooltip>
                    <ActionTooltip lable="Xóa" >
                        <Trash 
                         onClick={(e)=>onAction(e,"deleteChannel")}
                        className="hidden group-hover:block h-4 w-4 text-zinc-500
                        hover:text-zinc-600 dark:text-zinc-400
                        dark:hover:text-zinc-300 transition"/>

                    </ActionTooltip>
                </div>
            )}
            {channel.name ==="general" && (
                <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400 "/>
            )}

        </button>
    )
}