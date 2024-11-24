"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ImageFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    imageURL: z.string().min(1, {
        message: "Image is required",
    }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current);

    const { handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageURL: initialData.imageURL || "",
        },
    });

    const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course updated");
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
                Ảnh bìa khóa học
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Hủy</>
                    ) : (
                        <>
                            {!initialData.imageURL ? (
                                <>
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    Thêm ảnh
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
                !initialData.imageURL ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageURL}
                        />
                    </div>
                )
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                setValue("imageURL", url);
                                handleSubmit(onSubmit)();
                            }
                        }}
                    />
                    {errors.imageURL && <p className="text-red-600">{errors.imageURL.message}</p>}
                    <div className="text-xs text-muted-foreground mt-4">
                        tỉ lệ hình ảnh đề xuất 16:9
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                        Save
                    </Button>
                </form>
            )}
        </div>
    );
};
