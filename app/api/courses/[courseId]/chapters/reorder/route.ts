import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export async function PUT(
    req:Request, 
    {params} : {params:Promise< {courseId:string}>}
) {
    try {
            const resolvedParams = await params;

        const {userId} =await auth();

        if (!userId){
            return new NextResponse("Unauthorized", {status:401});
        }

        const {list} = await req.json()


        const courseOwner = await db.course.findUnique({
            where:{
                id:resolvedParams.courseId,
                userId: userId,
            }
        });
        if (!courseOwner){
            return new NextResponse("Unauthorized", {status:401});
        }
        
        for(const item of list){
            await db.chapter.update({
                where:{
                    id: item.id,
                },
                data:{
                    position:item.position
                }
            })
        }
        
        return new NextResponse("Susses", {status:200});
      
    } catch (error) {
        console.log("[REORDER]",error)
        return new NextResponse("Internal Error", {status:500});
    }
    
}