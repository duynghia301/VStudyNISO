import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdPageProps{
    params:Promise<{
        serverId:string;
    }>
}


const ServerIdPage = async({
    params
}:ServerIdPageProps) => {
    const param = await params;
    const profile = await currentProfile();

    if(!profile){
        return RedirectToSignIn
    }

    const server= await db.server.findUnique({
        where:{
            id:param.serverId,
            members:{
                some:{
                    profileId:profile.id
                }
                
            }
        },
        include:{
            chanel:{
                where:{
                    name:"general"
                },
                orderBy:{
                    creeatedAt:"asc"
                }
            }
        }
    })

    const initialChannel = server?.chanel[0];
    
    if(initialChannel?.name !== "general"){
        return null;
    }
    return redirect(`/servers/${param.serverId}/channels/${initialChannel?.id}`)
}
 
export default ServerIdPage;