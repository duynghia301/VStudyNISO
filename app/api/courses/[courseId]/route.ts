import { db } from "@/lib/db";
import { auth, getAuth } from "@clerk/nextjs/server"; 
import { NextResponse, NextRequest } from "next/server"; 

import Mux from "@mux/mux-node"

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID as string,
  tokenSecret: process.env.MUX_PRIVATE_KEY as string,
});

const { video } = mux;

export async function DELETE(
  req: Request,
  { params }: { params:Promise< { courseId: string; } >}
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

    const course = await db.course.findUnique({
      where: {
        id: resolvedParams.courseId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await video.assets.delete(chapter.muxData.assetId); 
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: resolvedParams.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("COURSE_ID_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest, 
  { params }: { params:Promise< { courseId: string } >}
) {
  try {
    const resolvedParams = await params;
    const { courseId } = resolvedParams;
    const authResult = await getAuth(req); 
    const userId = authResult.userId; 

    if (!userId) {
      return NextResponse.redirect('/dashboard'); 
    }

    const values = await req.json();
    console.log("PATCH request received with values:", values);
    
    const course = await db.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
