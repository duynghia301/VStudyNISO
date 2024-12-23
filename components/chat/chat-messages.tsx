"use client"

import { Member, Message, Profile } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment,useRef, ElementRef } from "react";
import { ChatItem } from "./chat-item";
import {format} from "date-fns"
import { useChatSocket } from "@/hooks/use-chat-socket";
import { UseChatScroll } from "@/hooks/use-chat-scroll";

const DATE_FORMAT ="d MMM yyyy, HH:mm"
type MessageWithMemberWithProfile = Message &{
    member:Member &{
        profile:Profile
    }
}
interface ChatMessagesProps{
    name:string;
    member:Member;
    chatId:string
    apiUrl:string;
    socketUrl:string;
    socketQuery: Record<string,string>;
    paramKey:"channelId"|"conversationId";
    paramValue:string;
    type:"channel"|"conversation";
    
}

export const ChatMessages =({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
}:ChatMessagesProps)=>{
    const addKey= `chat:${chatId}:messages`;
    const updateKey= `chat:${chatId}:messages:update`;
    const queryKey = `chat:${chatId}`;

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);


    const {
    data,fetchNextPage,hasNextPage,isFetchingNextPage,status
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
        
    })
    useChatSocket({ queryKey, addKey, updateKey });

    UseChatScroll({
      chatRef,
      bottomRef,
      loadMore: fetchNextPage,
      shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
      count: data?.pages?.[0]?.items?.length ?? 0, 
    });
    

    if(status=== "pending" ){
        return(
            <div className=" flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className=" text-xs text-zinc-500 dark:text-zinc-400">
                    Loading message...
                </p>
            </div>
        )
    } 
    if(status=== "error" ){
        return(
            <div className=" flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500  my-4"/>
                <p className=" text-xs text-zinc-500 dark:text-zinc-400">
                    Something when wrong!
                </p>
            </div>
        )
    }

    return(
        <div ref={chatRef} className="flex-1 flex-col py-4 overflow-y-auto">
            {!hasNextPage && <div className="flex-1"/>}
            {!hasNextPage &&  <ChatWelcome
                    type={type}
                    name= {name}
                />
            }
            {hasNextPage &&(
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                    <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4"/>
                ):(
                    <button
                    onClick={()=>fetchNextPage()}
                    className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition">
                        tải các tin nhắn trước
                    </button>                    
                    )}
             
                </div>
                )}

                <div className="flex flex-col-reverse mt-auto">
                    {data?.pages?.map((group, i)=>(
                        <Fragment key={i}>
                            {group?.items?.map((message:MessageWithMemberWithProfile)=>(
                              <ChatItem
                                key={message.id}
                                id={message.id}
                                currenMember={member}
                                member={message.member}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                deleted={message.delete}
                                timestamp={format(new Date(message.creeatedAt),DATE_FORMAT)}
                                isUpdated= {message.updateAt !== message.creeatedAt}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                              />
                              
                            ))}

                        </Fragment>
                    ))}
                   

                </div>
                <div ref={bottomRef}/>
            </div>
        
    )
}