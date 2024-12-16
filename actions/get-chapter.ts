import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  chapterId,
  courseId,
}: GetChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    console.log("Course:", course);
    console.log("Chapter:", chapter);

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxdata = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      muxdata = await db.muxdata.findUnique({
        where: {
          chapterId: chapterId,
        },
      });
    }

    nextChapter = await db.chapter.findFirst({
      where: {
        courseId: courseId,
        isPublished: true,
        position: {
          gt: chapter.position,
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    const useProgress = await db.useProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      muxdata,
      attachments,
      nextChapter,
      useProgress,
      purchase,
    };
  } catch (error) {
    console.log("GET_CHAPTER Error:", error);
    return {
      chapter: null,
      course: null,
      muxdata: null,
      attachments: [],
      nextChapter: null,
      useProgress: null,
      purchase: null,
    };
  }
};
