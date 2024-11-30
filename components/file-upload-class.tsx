"use client"

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
// import "@/uploadthing/react/style.css";
import toast from "react-hot-toast";
import {File, X} from "lucide-react"
import Image from "next/image";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value:string
    endpoint: keyof typeof ourFileRouter;
}
export const FileUploadClass = ({
    onChange,
    value,
    endpoint,

    }:FileUploadProps)=>{
        const fileType = value?.split(".").pop();

        if( value && fileType !== "pdf"){
            return(
                <div className=" relative h-20 w-20">
                    <Image
                        fill
                        src={value}
                        alt="Upload"
                        className="rounded-full"
                    />
                    <button
                        onClick={()=>onChange("")}
                        className="bg-red-600 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                        type="button"
                        >
                                <X className="h-4 w-4"/>
                    </button>
                </div>
            )
        }
        if (value && fileType === "pdf"){
            return(
                <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                    <File className="h-10 w-10 fill-indigo-200 stroke-indigo-400"/>
                    <a 
                        href={value}
                        target="_blank"
                        rel="noopeneder noreferrer"
                        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                    >
                        {value}
                    </a>
                    <button
                        onClick={()=>onChange("")}
                        className="bg-red-600 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                        type="button"
                        >
                                <X className="h-4 w-4"/>
                    </button>
                </div>
            )
        }
        return(
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    const uploadedUrl = res?.[0].url;
                    if (uploadedUrl) {
                        onChange(uploadedUrl);
                        console.log("Uploaded URL:", uploadedUrl);
                    } else {
                        toast.error("Upload failed. No URL received.");
                    }
                }}
                onUploadError={(error: Error) => {
                    console.error("Upload error:", error);
                    toast.error(`ERROR! ${error.message}`);
                }}
         />  
    )
        
}