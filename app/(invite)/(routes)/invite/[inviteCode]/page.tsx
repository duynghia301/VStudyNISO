import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodePageProps{
    params:{
        inviteCode:string
    }
}

const InviteCodePage = async({
    params,
}:InviteCodePageProps) => {

    const profile = await currentProfile();
    if(!profile){
    return redirect("/sign-in");
    }
    if(!params.inviteCode){
    return redirect("/dashboard")
    }
    const existingServer = await db.server.findFirst({
        where:{
            inviteCode: params.inviteCode,
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }       
    });

    const server = await db.server.update({
        where:{
            inviteCode:params.inviteCode,
        },
        data:{
            members:{
                create:{
                    profileId:profile.id,
                }
            }
        }
    });
    if(server){
        return redirect(`/servers/${server.id}`)
    }
    if(existingServer){
        return redirect (`/servers/${existingServer.id}`)
    }
 

    return null
}
 
export default InviteCodePage;

