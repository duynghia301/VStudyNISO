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

        // Update message event handler
        const updateMessage = (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData?.pages?.length) return oldData;

                // Update the message in the pages
                const newData = oldData.pages.map((page: any) => ({
                    ...page,
                    items: page.items.map((item: MessageWithMemberWithProfile) =>
                        item.id === message.id ? message : item
                    ),
                }));

                return { ...oldData, pages: newData };
            });
        };

        // Add new message event handler
        const addMessage = (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                const newData = oldData?.pages ? [...oldData.pages] : [{ items: [message] }];
                newData[0] = { ...newData[0], items: [message, ...newData[0].items] };
                return { ...oldData, pages: newData };
            });
        };

        // Listen to socket events
        socket.on(updateKey, updateMessage);
        socket.on(addKey, addMessage);

        // Clean up event listeners when component is unmounted
        return () => {
            socket.off(addKey, addMessage);
            socket.off(updateKey, updateMessage);
        };
    }, [socket, queryClient, addKey, updateKey, queryKey]);
};
