import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params:Promise< { courseId: string; chapterId: string } >}
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

        const unpublicChapter = await db.chapter.update({
            where:{
                id:resolvedParams.chapterId,
                courseId:resolvedParams.courseId
            },
            data:{
                isPublished:false,
            }
        })

        const publisedChapterInCourse = await db.chapter.findMany({
            where:{
                courseId:resolvedParams.courseId,
                isPublished:true,
            }
        });
        if(!publisedChapterInCourse.length){
            await db.course.update({
                where:{
                    id:resolvedParams.courseId,
                },
                data:{
                    isPublished:false
                }
            })
        }

        return NextResponse.json(unpublicChapter)
    } catch (error) {
          console.log("CHAPTER_PUBLISH",error)
            return new NextResponse("Internal Error", { status: 500 });
    }
    
}