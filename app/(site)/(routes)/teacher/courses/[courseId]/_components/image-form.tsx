"use client"

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";



interface ImageFormProps{
    initialData:Course
    courseId:string
};

const formSchema = z.object({
    imageURL: z.string().min(1,{
        message:"Image is required",
    }),
});



export const ImageForm = ({
    initialData,
    courseId
}:ImageFormProps) =>{

    const [isEditng, setIsEditing]= useState(false);

    const toggleEdit = () => setIsEditing((current)=>!current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            imageURL:initialData?.imageURL||""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log("Submitting values:", values); // Log dữ liệu để kiểm tra
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Something went wrong");
        }
    };
    
    

    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className=" font-medium flex items-center justify-between">
                Ảnh bìa khóa học

                <Button onClick={toggleEdit} variant="ghost">
                    {isEditng  && (
                        <>Hủy</>
                    )}
                    {!isEditng && !initialData.imageURL &&(
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Thêm ảnh
                        </>
                    )}
                    
                    {!isEditng && initialData.imageURL&& (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                             Chỉnh sửa
                        </>
                    )}
                      
                    

                  
                 
                </Button>
            </div>
            {!isEditng && (
               !initialData.imageURL ? (
                <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                    <ImageIcon className="h-10 w-10 text-slate-500"/>
                </div>
               
            ):(
                <div className="relative  aspect-video mt-2">
                    <Image
                    alt="Upload"
                    fill
                    className="object-cover rounded-md"
                    src={initialData.imageURL}
                    />
                </div>
            )
            )}
            {isEditng &&(
        
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url)=>{
                            if(url){
                                onSubmit({imageURL:url});
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        tỉ lệ hình ảnh đề xuất 16:9
                    </div>
                </div>
            )}
        </div>
    )
}