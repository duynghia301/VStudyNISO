import { IconBadge } from "@/components/ui/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { Banner } from "@/components/banner";
import { ChapterACtions } from "./_components/chapter-actions";

const ChapterIdPage = async({
    params
}:{
    params:{courseId: string; chapterId: string}
}) => {
    const {userId} = await auth()
    const param = await params
    if(!userId){
        return redirect("/")
    }

    const chapter =  await db.chapter.findUnique({
        where:{
            id: param.chapterId,
            courseId:param.courseId
        },
        include:{
            muxData:true
        },
    });

    if(!chapter){
        return redirect("/")
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);



    return ( 
        <>
        {!chapter.isPublished && (
            <Banner
                variant="warning"
                label="Chapter này không công khai. Nên sẽ không hiển thị trong khóa học"

            />
        )}
        <div className="p-6"> 
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <Link
                    href={`/teacher/courses/${param.courseId}`}
                    className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2"/>
                        Quay lại                    
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                Cài đặt chapter
                            </h1>
                            <span className="text-sm text-slate-700">
                                Hoàn thành {completionText}
                            </span>
                        </div>
                        <ChapterACtions
                            disable={!isComplete}
                            courseId={param.courseId}
                            chapterId={param.chapterId}
                            isPublished={chapter.isPublished}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard}/>
                            <h2 className="text-xl">
                                Chỉnh sửa chapter của bạn
                            </h2>
                        </div>
                        <ChapterTitleForm
                            initialData={chapter}
                            courseId={param.courseId}   
                            chapterId={param.chapterId}
                        /> 
                        <ChapterDescriptionForm
                            initialData={chapter}
                            courseId={param.courseId}
                            chapterId={param.chapterId}
                        />
                    </div>
                   <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={Eye}/>
                            <h2>
                                Cài đặt truy cập
                            </h2>
                        </div>
                        <ChapterAccessForm
                            initialData={chapter}
                            courseId={param.courseId}
                            chapterId={param.chapterId}
                        />
                   </div>

                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={Video}/>
                        <h2 text-xl={true}>
                            Thêm video
                        </h2>


                    </div>
                    <ChapterVideoForm
                        initialData={chapter}
                        courseId={param.courseId}
                        chapterId={param.chapterId}
                    />
                </div>
               
            </div>
        </div>
        </>
     );
     
}
 
export default ChapterIdPage;