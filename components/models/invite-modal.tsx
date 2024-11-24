"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const InviteModal = () => {
    const { isOpen, onClose, type, data, onOpen } = useModal();
    const origin = useOrigin();
    const isModalOpen = isOpen && type === "invite";
    const { server } = data;
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/classes/${server?.id}/inviteCode`);
            onOpen("invite", { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        THÊM THÀNH VIÊN MỚI
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Mã mời vào khóa học
                        <div className="flex items-center mt-2 gap-x-2">
                            <Input
                                disabled={isLoading}
                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                value={inviteUrl}
                            />
                            <Button disabled={isLoading} onClick={onCopy} size="icon">
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                        <Button
                            onClick={onNew}
                            disabled={isLoading}
                            variant="link"
                            size="sm"
                            className="text-xs text-zinc-500 mt-4"
                        >
                            Tạo lại liên kết
                            <RefreshCw className="w-4 h-4 ml-2" />
                        </Button>
                    </Label>
                </div>
            </DialogContent>
        </Dialog>
    );
};
