"use client"

import { CreateClassModal } from "@/components/models/create-class-modal"
import { useEffect, useState } from "react"
import { InviteModal } from "@/components/models/invite-modal";
import { EditClassModal } from "@/components/models/edit-class-modal";
import { MembersModal } from "@/components/models/members-modal";
import { CreateChannelModal } from "@/components/models/create-channel-modal";
import { LeaveServerModal } from "@/components/models/leave-server.modal";
import { DeleteServerModal } from "@/components/models/delete-server.modal";

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
            <EditClassModal/>
            <MembersModal/>
            <CreateChannelModal/>
            <LeaveServerModal/>
            <DeleteServerModal/>
        </>
    )
}