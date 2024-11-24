"use client"

import { ServerWithMemberWithProfile } from "@/types"
import { MemberRole } from "@prisma/client"
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent, 
    DropdownMenuItem,
    DropdownMenuSeparator, 


} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOutIcon, PlusCircle, Settings, TrashIcon, UserPlus, Users } from "lucide-react"
import { useModal } from "@/hooks/use-modal-store"

interface ClassHeaderProps {
    server: ServerWithMemberWithProfile;
    role?: MemberRole;
}

export const ClassHeader = ({
    server,
    role,
}: ClassHeaderProps) => {

    const{onOpen} =useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger 
                className="focus:outline-none" 
                asChild
            >
                <button className="text-gray-800 dark:text-gray-200 w-full text-md font-semibold px-3 flex
                items-center h-12 border-neutral-200 
                dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10
                dark:hover:bg-zinc-700/50 transition">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={()=>onOpen("invite",{server})}
            
            className="w-56 text-xs font-medium text-black
            dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                    <DropdownMenuItem className="text-indigo-700 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer ">
                        Invite people
                        <UserPlus className=" h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                    
                )}
                {isAdmin && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer ">
                        Settings
                        <Settings className=" h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                    
                )}
                {isAdmin && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer ">
                        Manage Members
                        <Users className=" h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                    
                )}
                {isModerator && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer ">
                        Create Channel
                        <PlusCircle className=" h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                    
                )}
                {isModerator && (
                    <DropdownMenuSeparator/> 
                )}
             
                {isAdmin && (
                    <DropdownMenuItem className="text-red-600  px-3 py-2 text-sm cursor-pointer ">
                        Delete Server
                        <TrashIcon className=" h-4 w-4 ml-auto"/>
                        
                    </DropdownMenuItem>
                    
                )}
                {!isAdmin && (
                    <DropdownMenuItem className="text-red-600  px-3 py-2 text-sm cursor-pointer ">
                        Leave Server
                        <LogOutIcon className=" h-4 w-4 ml-auto"/>
                        
                    </DropdownMenuItem>
                    
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
