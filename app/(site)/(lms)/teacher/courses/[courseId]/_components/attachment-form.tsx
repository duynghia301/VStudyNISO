"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AttachmnetFormProps {
    initialData: Course &{ attachments:Attachment[]};
    courseId: string;
}

const formSchema = z.object({
    url: z.string().min(1, {
       
    }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const AttachmnetForm = ({ initialData, courseId }: AttachmnetFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeleting] = useState<string |null>(null);

    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current);

    const { handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: initialData.imageURL || "",
        },
    });

    const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success("Course updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Something went wrong");
        }
    };

    const onDelete = async (id:string)=>{
        try {
            setDeleting(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success("Tệp tin đã được xóa")
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong")
        } finally{
            setDeleting(null)
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Tệp tin
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Hủy</>
                    )}
                        
                        {!isEditing && (
                            <>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Thêm file
                            </>
                            
                       
                    )}
                </Button>
            </div>
            {!isEditing && (
              <>
                {initialData.attachments.length === 0 && (
                    <p className="text-sm mt-2 text-slate-500 italic">
                        Nothing yet
                    </p>
                )}
                {initialData.attachments.length > 0 &&(
                    <div className="space-y-2">
                        {initialData.attachments.map((attachment)=>(
                            <div  
                                key = {attachment.id}
                                className="flex items-center p-3 w-full bg-sky-100
                                border-x-sky-200 border text-sky-700 rounded-md"
                            >
                                <File className=" h-4 w-4 mr-2 flex-shrink-0"/>
                                <p className="text-xs line-clamp-1">
                                    {attachment.name}
                                </p>
                                {deletingId === attachment.id && (
                                    <div>
                                        <Loader2 className="h-4 w-4 animate-spin"/>
                                    </div>
                                )}
                                {deletingId !== attachment.id && (
                                    <button 
                                        onClick={()=>onDelete(attachment.id)}
                                        className="ml-auto hover:opacity-75 transition">
                                        <X className="h-4 w-4"/>
                                    </button>
                                )}
                            </div>
                        ))}

                    </div>
                )}
              </>
            )} 

            {isEditing && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                setValue("url", url);
                                handleSubmit(onSubmit)();
                            }
                        }}
                    />
                    {errors.url && <p className="text-red-600">{errors.url.message}</p>}
                    <div className="text-xs text-muted-foreground mt-4">
                        Thêm bài giảng
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                        Lưu
                    </Button>
                </form>
            )}
           
        </div>
    );
};
