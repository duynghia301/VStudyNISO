"use client"

import { Plus, Settings } from "lucide-react";

import { ChanelType, MemberRole } from "@prisma/client";
import { ServerWithMemberWithProfile } from "@/types";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps{
 
    label:string;
    role?:MemberRole;
    sectionType:"channel"|"member"
    channelType?: ChanelType;
    server?:ServerWithMemberWithProfile;
};

export const ClassSection =({
    label,
    role,
    sectionType,
    channelType,
    server,
}:ServerSectionProps)=>{
    const {onOpen}= useModal();

    return(
       <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role !==MemberRole.GUEST && sectionType ==="channel"&&(
                <ActionTooltip lable="Thêm" side="top">
                    <button 
                    onClick={()=>onOpen("createChannel",{channelType})}
                    className=" text-zinc-500 
                    hover:text-zinc-600 
                    dark:text-zinc-400 
                    dark:hover:text-zinc-300">
                        <Plus className="h-4 w-4"/>
                    </button>

                </ActionTooltip>
            )}
              {role ===MemberRole.ADMIN && sectionType ==="member"&&(
                <ActionTooltip lable="Quản lý" side="top">
                    <button 
                    onClick={()=>onOpen("members",{server})}
                    className=" text-zinc-500 
                    hover:text-zinc-600 
                    dark:text-zinc-400 
                    dark:hover:text-zinc-300">
                        <Settings className="h-4 w-4"/>
                    </button>

                </ActionTooltip>
            )}


       </div>
    )
}