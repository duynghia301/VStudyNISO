"use client"

import { CreateClassModal } from "@/components/models/create-class-modal"
import { useEffect, useState } from "react"
import { InviteModal } from "@/components/models/invite-modal";

export const ModalProvider=()=>{
    const [isMounted, serIsMounted]= useState(false);

    useEffect(()=>{
        serIsMounted(true)
    },[]);

    if(!isMounted)
        return null;

    return(
        <>
            <CreateClassModal/>
            <InviteModal/>
        </>
    )
}