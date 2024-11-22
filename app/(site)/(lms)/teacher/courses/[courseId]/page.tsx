import { IconBadge } from "@/components/ui/icon=badge";
import {db} from "@/lib/db"
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";

const CourseIDPage= async ({
    params
}:{
    params:{courseId: string }
})=>{

    const {courseId}=await params;
    const {userId} = await auth();
    const isAuth = !!userId

    if ( !isAuth ){
        return redirect("/dashboard");
    }

    const course = await db.course.findUnique({
        where:{
            id: courseId,
        }
    })
    if (!course){
        return redirect("/dashboard");
    }

    const requireFields=[
        course.title,
        course.description ||'',
        course.imageURL,
        course.categoryId
    ]
    const totalFields = requireFields.length;
    const completedFileds = requireFields.filter(Boolean).length

    const completionText = `(${completedFileds}/ ${totalFields})`


    return(
        <div className="p-6">
            <div className=" flex items-center justify-between">
                <div className=" flex flex-col gap-y-2">
                    <h1 className="text-2x1 font-medium">
                        Chuẩn bị khóa học
                    </h1>
                    <span className="text-sm text-slate-700">
                        Hoàn thành tất cả các mục {completionText}
                    </span>
                </div>              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge size="sm" icon={LayoutDashboard}/>
                        <h2 className="text-xl">
                            tùy chỉnh khóa học
                        </h2>
                    </div>
                    <TitleForm
                    initialData = {course}
                    courseId = {course.id}
                    />
                    <DescriptionForm
                    initialData = {course}
                    courseId = {course.id}
                    />
                     <ImageForm
                     initialData = {course}
                    courseId = {course.id}
                    />
                </div>
            </div>
        </div>
    )

}

export default CourseIDPage;