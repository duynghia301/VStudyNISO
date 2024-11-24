
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-items";
import { ModeToggle } from "../themebutton";
import { LogOut} from "lucide-react";
import Link from "next/link";

export const NavigationSideBar = async()=>{
   
    
    
    const profile = await currentProfile();
   

    if(!profile){
        return redirect("/dashboard")
    }

    const classes = await db.server.findMany({
        where:{
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    })
    return(
        <div className="space-y-4 flex flex-col items-center h-full text-white w-full bg-sky-400 py-3"> 
            <NavigationAction/>
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"/>
            <ScrollArea className="flex-1 w-full">
                {classes.map((server)=>(
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}

            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4 cursor-pointer" >
                <ModeToggle/>
                <Link href={"/dashboard"}>
                    <button className="h-[48px] w-[48px] rounded-md bg-red-500 hover:bg-red-600 flex items-center justify-center">
                        <LogOut className="text-white" size={24} />
                    </button>
                 </Link>
            </div>
        </div>

    )
}