import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export async function POST(
    req:Request, 
    {params} : {params:Promise< {courseId:string}>}
) {
    try {
            const resolvedParams = await params;

        const {userId} =await auth();
        const {title} = await req.json();

        if (!userId){
            return new NextResponse("Unauthorized", {status:401});
        }

        const courseOwner = await db.course.findUnique({
            where:{
                id:resolvedParams.courseId,
                userId: userId,
            }
        });
        if (!courseOwner){
            return new NextResponse("Unauthorized", {status:401});
        }

        const lastChapter = await db.chapter.findFirst({
            where:{
                courseId:resolvedParams.courseId,
            },
            orderBy:{
                position:"desc"
            }
        });


        const newPosition = lastChapter ? lastChapter.position + 1 : 1;
        const chapter = await db.chapter.create({
            data:{
                title,
                courseId:resolvedParams.courseId,
                position:newPosition,
            }
        })
        return NextResponse.json(chapter)

    } catch (error) {
        console.log("COURSE_ID_ATTACHMENTS",error)
        return new NextResponse("Internal Error", {status:500});
    }
    
}