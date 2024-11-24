"use client"

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
// import "@/uploadthing/react/style.css";
import toast from "react-hot-toast";
import {X} from "lucide-react"
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

        if( value && fileType !== "pdf" ){
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