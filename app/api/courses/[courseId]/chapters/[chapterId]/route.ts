import Mux from '@mux/mux-node';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID as string,
  tokenSecret: process.env.MUX_PRIVATE_KEY as string,
});

const { video } = mux;

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
){
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
    if(!chapter){
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxdata.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });
    if (existingMuxData) {
      await video.assets.delete(existingMuxData.assetId); 
      await db.muxdata.delete({
        where: {
          id: existingMuxData.id,
        },
      });
    }
  }

  const deletedChapter = await db.chapter.delete({
    where:{
      id:params.chapterId
    }
  });

  const publisedChapterInCourse = await db.chapter.findMany({
  where:{
    courseId:params.chapterId,
    isPublished:true,
  }
  });
  if(!publisedChapterInCourse.length){
    await db.course.update({
      where:{
        id:params.courseId,
      },
      data:{
        isPublished:false,
      }
    })
  }

    
 return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("CHAPTER_ID_DETELE",error)
    return new NextResponse("Internal Error", { status: 500 });
  }
}





export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    const { isPublished, ...values } = await req.json();

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

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxdata.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);  
        await db.muxdata.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await video.assets.create({  
        input: values.videoUrl,
        playback_policy: ["public"], 
        test: false,
      });

      await db.muxdata.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0].id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("COURSES_CHAPTER_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
