import { CLassSideBar } from "@/components/class/class-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";

const ClassIdLayout = async({
    children,
    params,
}:{
    children:React.ReactNode;
    params:{serverId:string}
})=> {

    const {serverId}=await params;
    const profile = await currentProfile();
    if (!profile){
        return redirect("/dashboard")
    }

  
    const server = await db.server.findUnique(
       { where:{
            id: serverId,
            members:{
                some:{
                    profileId:profile?.id
                }
            }
        }}
    )

    if(!server){
        return redirect("/dashboard")
    }
    return ( 
            <div className="h-full">
               <div className="hidden md:flex h-full w-60 -z-20 flex-col fixed inset-y-0">

               <CLassSideBar serverId={serverId} />
                    
               
               </div>
               <div>
                <main className="h-full md:pl-60">
                 {children}
                </main>
               </div>
                
      

               
            </div>
      );
}
 
export default ClassIdLayout;