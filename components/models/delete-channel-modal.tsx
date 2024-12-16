"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import qs from "query-string"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import {  useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export const DeleteChannelModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "deleteChannel";
    const { server ,channel } = data;

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
        if (!isModalOpen) {
            setIsLoading(false);
        }
    }, [isModalOpen]);

    const onClick = async () => {
        try {
            if (!server?.id) {
                console.error("Server ID is missing");
                return;
            }
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            });
            setIsLoading(true);
            await axios.delete(url);
            onClose();
            router.refresh();
           
        } catch (error) {
            console.error("Error deleting channel:", error); 
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold text-red-500">
                        <AlertTriangle className="text-center justify-center" />
                            XÁC NHẬN XÓA
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Bạn có chắc muốn xóa? <br />
                        <span className="font-semibold text-red-500">#{channel?.name}</span> sẽ bị xóa cân nhắc dữ liệu
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isLoading}
                            variant="ghost"
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                        <Button
                            disabled={isLoading}
                            variant="primary"
                            onClick={onClick}
                        >
                            Đồng ý
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
