"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ChanelType } from "@prisma/client";
import qs from "query-string";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Class name is required",
    }).refine(
        name=> name!== "chung",
        {
            message:"Tên không hợp lệ"
        }
    ),
    type: z.nativeEnum(ChanelType)     
});

export const EditChannelModal = () => {

    const {isOpen,onClose,type,data}= useModal();
    const {channel, server}= data
    const router = useRouter();


    const isModalOpen = isOpen && type ==="editChannel";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name:"",
          type: channel?.type ||ChanelType.TEXT,
        }
    });

    useEffect(()=>{
      if(channel){
        form.setValue("name", channel.name);
        form.setValue("type", channel.type);
      }
    },[form,channel ])

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query:{
                    serverId:server?.id
                }
            })
            await axios.patch(url, values)
            
            form.reset();
            router.refresh();
            onClose();
   
        } catch (error) {
            console.log(error)
        }
    };

    const handleClose=()=>{
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Chỉnh sửa
                    </DialogTitle>
                  
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                        
                   
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Tạo kênh /Phòng học
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 peer-focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Nhập tên phòng học"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control  }
                                name="type"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel 
                                            className="uppercase text-xs font-bold
                                            text-zinc-500 dark:text-secondary/70"
                                        >
                                            Loại kênh 
                                        </FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                           <FormControl>
                                                <SelectTrigger
                                                    className="bg-zinc-300/50 border-0
                                                    focus:ring-0 text-black ring-offset-0
                                                    focus:ring-offset-0 capitalize outline-none"
                                                >
                                                <SelectValue placeholder = "Chọn 2 loại kênh"/>        
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                               {Object.values(ChanelType).map((type: ChanelType) => (
                                                <SelectItem key={type} value={type} className="capitalize">
                                                    {type.toLowerCase()}
                                                </SelectItem>
                                                ))}

                                            </SelectContent>     
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button type="submit" disabled={isLoading}>
                                Lưu
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
