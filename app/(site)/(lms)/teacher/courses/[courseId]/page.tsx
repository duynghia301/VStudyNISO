import { IconBadge } from "@/components/ui/icon-badge";
import {db} from "@/lib/db"
import { auth } from "@clerk/nextjs/server";
import { CircleDollarSign, File, LayoutDashboard, ListCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmnetForm } from "./_components/attachment-form";
import { ChaprersForm } from "./_components/chapters-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";

const CourseIDPage= async ({
    params
}:{
    params:{courseId: string }
})=>{
    const param = await params

    const {courseId}= await params;
    const {userId} = await auth();
    const isAuth = !!userId

    if ( !isAuth ){
        return redirect("/dashboard");
    }

    const course = await db.course.findUnique({
        where:{
            id: courseId,
            userId

        },
        include:{
            chapters: {
                orderBy:{
                    position: "asc"
                },
            },
            attachments:{
                orderBy:{
                    createdAt:"desc"
                }
            }
        }
    })

    const categories = await db.category.findMany({
        orderBy:{
            name:"asc",
        },
    });
    console.log(categories)

    if (!course){
        return redirect("/dashboard");
    }

    const requireFields=[
        course.title,
        course.description ||'',
        course.imageURL,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
    ]
    const totalFields = requireFields.length;
    const completedFileds = requireFields.filter(Boolean).length

    const completionText = `(${completedFileds}/ ${totalFields})`

    const isComplete = requireFields.every(Boolean);


    return(
        <>
        {!course.isPublished && (
            <Banner
                variant="warning"
                label="Khóa học này chưa công khai. Nên sẽ không hiển thị cho học viên."

            />
        )}
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
                <Actions
                     disable={!isComplete}
                     courseId={param.courseId}
                     isPublished={course.isPublished}
                />             
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge size="sm" icon={LayoutDashboard}/>
                        <h2 className="text-xl">
                            Tùy chỉnh khóa học
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
                    <CategoryForm
                    initialData = {course}
                    courseId = {course.id}
                    options={categories.map((category)=>({
                        label:category.name,
                        value:category.id,
                    }))}
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListCheck}/>
                            <h2 text-xl> 
                                Chương
                            </h2>
                        </div>
                        <ChaprersForm
                            initialData = {course}
                            courseId = {course.id}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={CircleDollarSign}/>
                            <h2 className="text-xl">
                                Giá khóa học
                            </h2>
                        </div>
                        <PriceForm
                            initialData={course}
                            courseId={courseId}
                        />
                    </div>
                    <div>
                    <div className="flex items-center gap-x-2">
                            <IconBadge icon={File}/>
                            <h2 className="text-xl">
                                Tài liệu & Video
                            </h2>
                        </div>
                        <AttachmnetForm
                        initialData = {course}
                        courseId = {course.id}
                        />
                    </div>


                </div>
            </div>
        </div>
        </>
    )
    

}

export default CourseIDPage;