import { MobileToggle } from "@/app/(site)/(class)/_components/mobile-toggle";
import { Hash} from "lucide-react";


  

interface ChatHeaderProps{
    serverId:string
    name:string;
    type:"channel"|"conversation"
    imageUrl?:string
}


export const ChatHeader = ({
    name,
    type,
    imageUrl,
    serverId
}:ChatHeaderProps)=> {
    return(
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            < MobileToggle serverId={serverId}/>
            {type === "channel"&& (
                <Hash className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2"/>
            )}
            <p className="text-md font-semibold text-black dark:text-white">
                {name}
            </p>
        </div>
    )
}