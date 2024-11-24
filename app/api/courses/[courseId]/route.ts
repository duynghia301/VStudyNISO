import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server"; // Sử dụng getAuth từ @clerk/nextjs/server
import { NextResponse, NextRequest } from "next/server"; // Sử dụng NextResponse và NextRequest

export async function PATCH(
  req: NextRequest, // Sử dụng NextRequest từ next/server
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } =  params;
    const authResult = await getAuth(req); 
    const userId = authResult.userId; 

    if (!userId) {
      return NextResponse.redirect('/dashboard'); // Điều hướng nếu không có userId
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
