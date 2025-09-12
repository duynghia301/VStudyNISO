import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIDPage = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const param = await params;
  const course = await db.course.findUnique({
    where: {
      id: param.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course || !course.chapters.length) {
    return redirect("/");
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};

export default CourseIDPage;
