
import {ChanelType, Server,Chanel } from "@prisma/client";
import {create} from "zustand"


export type ModalType = "createClass" | "invite" |"editClass"|"members"|"createChannel"|"leaveServer"|"deleteServer"|"deleteChannel"|"editChannel"|"messageFile";

interface ModalData{
    server?:Server;
    channel?:Chanel;
    channelType?:ChanelType;
    apiUrl?:string;
    query?:Record<string,any>;
   
}




interface ModalStore{
    type: ModalType| null;
    data: ModalData,
   
    isOpen:boolean;
    onOpen:(type:ModalType , data?:ModalData)=>void;
    onClose:()=> void;


}

export const useModal = create<ModalStore>((set)=>({
    type:null,
    data:{},
    isOpen:false,
    onOpen:(type,data={})=>set ({isOpen:true,type,data}),
    onClose:()=>set({type:null,isOpen:false})
}));