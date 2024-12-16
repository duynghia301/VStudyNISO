import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const courseOwner = await db.course.findUnique({
            where: {
            id: params.courseId,
            userId,
            },
        });
        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        } 

        const chapter = await db.chapter.findUnique({
            where: {
              id: params.chapterId,
              courseId: params.courseId,
            },
        });
        const muxData = await db.muxdata.findUnique({
            where:{
                chapterId:params.chapterId
            }
        })


        if(!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl){
        return new NextResponse("Missing required fields", { status: 400 });
        }
      
        const publicChapter = await db.chapter.update({
            where:{
                id:params.chapterId,
                courseId:params.courseId
            },
            data:{
                isPublished:true,
            }
        })
        return NextResponse.json(publicChapter)
    } catch (error) {
          console.log("CHAPTER_PUBLISH",error)
            return new NextResponse("Internal Error", { status: 500 });
    }
    
}