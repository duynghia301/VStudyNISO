"use client"

import { UploadDropzone } from "@/lib/uploadthing"
import { ourFileRouter} from "@/app/api/uploadthing/core"
import toast from "react-hot-toast";

interface FileUploadProps{
    onChange:(url?:string)=>void;
    endpoint:keyof typeof ourFileRouter;
}

export const FileUpload = ({
    onChange,
    endpoint,
}:FileUploadProps)=>{

    return(
        <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
        const uploadedUrl = res?.[0].url;
        // console.log("Uploaded URL:", uploadedUrl); 
        onChange(uploadedUrl);
        console.log("Files: ", res);
        alert("Upload Completed");
    }}
    onUploadError={(error: Error) => {
        // console.error("Upload error:", error);
        // toast.error(`${error?.message}`);
        alert(`ERROR! ${error.message}`);
    }}
/>

    )

}