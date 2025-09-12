import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params:Promise< { courseId: string}> }
) {
    try {
            const resolvedParams = await params;

        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const course = await db.course.findUnique({
            where: {
            id: resolvedParams.courseId,
            userId,
            },
           
        });
        if (!course) {
            return new NextResponse("Not Found", { status: 404 });
        } 

      
        const unpublicCourse = await db.course.update({
            where:{
                id:resolvedParams.courseId,
                userId,
            },
            data:{
                isPublished:false,
            }
        })
        return NextResponse.json(unpublicCourse)
    } catch (error) {
          console.log("COURSE_ID_UNPUBLISH",error)
            return new NextResponse("Internal Error", { status: 500 });
    }
    
}