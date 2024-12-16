"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react"
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Chapter, Muxdata } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ChapterVideoFormProps {
    initialData: Chapter & {muxData?:Muxdata | null};
    courseId: string;
    chapterId:string;
}

const formSchema = z.object({
    videoUrl: z.string().min(1),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current);

    const { handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            videoUrl: initialData.videoUrl || "",
        },
    });

    const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
            Chapter Video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Hủy</>
                    ) : (
                        <>
                            {!initialData.videoUrl ? (
                                <>
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    Thêm video
                                </>
                            ) : (
                                <>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Chỉnh sửa
                                </>
                            )}
                        </>
                    )}
                </Button>
            </div>
            {!isEditing ? (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <VideoIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <MuxPlayer
                            playbackId={initialData?.muxData?.playbackId || ""}
                        />
                    </div>
                )
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                setValue("videoUrl", url);
                                handleSubmit(onSubmit)();
                            }
                        }}
                    />
                    {errors.videoUrl && <p className="text-red-600">{errors.videoUrl.message}</p>}
                    <div className="text-xs text-muted-foreground mt-4">
                        Tải lên video cho chapter này
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                        Lưu
                    </Button>
                </form>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Video có thể mất vài phút để tải. Tải lại trang nếu video không hiển thị.
                </div>
            )}
        </div>
    );
};
