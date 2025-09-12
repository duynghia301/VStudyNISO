import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
  { params }: { params: Promise<{ courseId: string;chapterId: string  }> }
) {
    try {
        const resolvedParams = await params;

        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const courseOwner = await db.course.findUnique({
            where: {
            id: resolvedParams.courseId,
            userId,
            },
        });
        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        } 

        const chapter = await db.chapter.findUnique({
            where: {
              id: resolvedParams.chapterId,
              courseId: resolvedParams.courseId,
            },
        });
        const muxData = await db.muxdata.findUnique({
            where:{
                chapterId:resolvedParams.chapterId
            }
        })


        if(!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl){
        return new NextResponse("Missing required fields", { status: 400 });
        }
      
        const publicChapter = await db.chapter.update({
            where:{
                id:resolvedParams.chapterId,
                courseId:resolvedParams.courseId
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