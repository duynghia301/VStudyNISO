import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/preview";
import { File } from "lucide-react";
import { CourseProgressButton } from "./_components/course-progress-button";

const ChapterIdPage = async({
    params
}:{
    params:{courseId:string;chapterId:string}
}) => {
    const {userId} =await auth()
    const param  = await params
    if (!userId){
        return redirect("/")
    }
    const {
        chapter,
        course,
        muxdata,
        attachments,
        nextChapter,
        useProgress,
        purchase,
    } = await getChapter({
        userId,
        chapterId:param.chapterId,
        courseId:param.courseId
    })

    if(!chapter ||!course){
        return redirect("/dashboard")
    }

    const isLocked = !chapter.isFree && !purchase;

    const completeOnEnd = !!purchase && !useProgress?.isCompleted

    return ( 
        <div>
            {useProgress?.isCompleted &&(
                <Banner
                    variant="success"
                    label="You already completed this chapter."
                />
            )}
            {isLocked &&(
                <Banner
                    variant="warning"
                    label="You need to purchase to watch this chapter."
                />
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer
                        chapterId={param.chapterId}
                        title={chapter.title}
                        courseId={param.courseId}
                        nextChapterId={nextChapter?.id!}
                        playbackId={muxdata?.playbackId!}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">
                            {chapter.title}
                        </h2>
                        {purchase ? (
                            <CourseProgressButton
                                chapterId = {params.chapterId}
                                courseId = {params.courseId}
                                nextChapterId={nextChapter?.id!}
                                isCompleted={!!useProgress?.isCompleted}
                            />
                        ):(
                            <CourseEnrollButton
                                courseId = {param.courseId}
                                price = {course.price!}
                            />
                        )}
                    </div>
                    <Separator/>
                    <div>
                        <Preview value={chapter.description!}/>
                    </div>
                    {!!attachments.length && (
                        <>
                        <Separator/>
                        <div>
                            {attachments.map((attachment)=>(
                                <a 
                                    href={attachment.url}
                                    target="_blank"
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                                    >
                                    <File/>
                                    <p className="line-clamp-1">
                                        {attachment.name}
                                    </p>


                                </a>
                            ))}
                        </div>
                        </>
                    )}
                </div>

            </div>
        </div>
     );
}
 
export default ChapterIdPage;