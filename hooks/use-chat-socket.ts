import { useSocket } from "@/components/providers/socket-provider";
import { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
};

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};

export const useChatSocket = ({
    addKey,
    updateKey,
    queryKey,
}: ChatSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) return;

        const updateMessage = (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData?.pages?.length) return oldData;

                const newData = oldData.pages.map((page: any) => ({
                    ...page,
                    items: page.items.map((item: MessageWithMemberWithProfile) =>
                        item.id === message.id ? message : item
                    ),
                }));

                return { ...oldData, pages: newData };
            });
        };

        const addMessage = (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                const newData = oldData?.pages ? [...oldData.pages] : [{ items: [message] }];
                newData[0] = { ...newData[0], items: [message, ...newData[0].items] };
                return { ...oldData, pages: newData };
            });
        };
        socket.on(updateKey, updateMessage);
        socket.on(addKey, addMessage);

        return () => {
            socket.off(addKey, addMessage);
            socket.off(updateKey, updateMessage);
        };
    }, [socket, queryClient, addKey, updateKey, queryKey]);
};