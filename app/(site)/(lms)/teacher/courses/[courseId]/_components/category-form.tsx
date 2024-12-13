"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";



import{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
}from "@/components/ui/form"
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";



interface CategoryFormProps{
    initialData:Course
    courseId:string
    options:{label:string; value:string;}[];
};

const formSchema = z.object({
    categoryId: z.string().min(1),
});



export const CategoryForm = ({
    initialData,
    courseId,
    options
}:CategoryFormProps) =>{

    const [isEditng, setIsEditing]= useState(false);

    const toggleEdit = () => setIsEditing((current)=>!current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            categoryId:initialData?.categoryId||""
        }
    })

    const{isSubmitting, isValid}=form.formState;
    const onSubmit =async (values: z.infer<typeof formSchema>)=>{
        try {
            await axios.patch(`/api/courses/${courseId}`,values)
            toast.success("Cousre updated");
            toggleEdit();
            router.refresh();

        } catch (error) {
            console.error("Error:", error); 
            toast.error("Something when wrong") 
        }
    }
    const selectedOption = options.find((option)=> option.value === initialData.categoryId)

    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className=" font-medium flex items-center justify-between">
                Loại khóa học

                <Button onClick={toggleEdit} variant="ghost">
                    {isEditng ? (
                        <>Hủy</>
                    ):(
                        <>
                           <Pencil className="h-4 w-4 mr-2"/>
                           Chỉnh sửa
                        </>
                    

                     )}
                 
                </Button>
            </div>
            {!isEditng && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.categoryId && "text-slate-500"
                )}>
                    {selectedOption?.label || "No category"}
                </p>
            )}
            {isEditng &&(
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({field})=>(
                                <FormItem>  
                                    <FormControl>
                                       <Combobox
                                        options={options}  
                                        value={field.value} 
                                        onChange={field.onChange}
                                       />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}    
                        />
                        <div className=" flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Lưu

                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}