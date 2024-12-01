import { useEffect, useState } from "react";

type ChatScrollProps={
    chatRef:React.RefObject<HTMLDivElement>;
    bottomRef:React.RefObject<HTMLDivElement>;
    shouldLoadMore:boolean;
    loadMore:()=>void;
    count:number;
};

export const UseChatScroll=({
    chatRef,
    bottomRef,
    loadMore,
    shouldLoadMore,
    count,
}:ChatScrollProps)=>{
    const [hasInitialized, setHasInitialized]= useState(false);

    useEffect(()=>{
        const topDiv = chatRef?.current;

        const handlerScroll = ()=>{
            const scrollTop =  topDiv?.scrollTop;

            if (scrollTop === 0 && shouldLoadMore){
                loadMore()
            }
        };

        topDiv?.addEventListener("scroll",handlerScroll)

        return()=>{
            topDiv?.removeEventListener("scroll",handlerScroll);
        }

       
    },  [shouldLoadMore,loadMore,chatRef])

    useEffect(()=>{
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef.current;
        const shouldAutoScroll=()=>{
            if(!hasInitialized && bottomDiv){
                setHasInitialized(true)
                return true
            }
            if(!topDiv){
                return false;
            }

            const distanceFromBottom = topDiv.scrollHeight  - topDiv.scrollTop - topDiv.clientHeight;
            return distanceFromBottom <=100;
        }
        if (shouldAutoScroll()){
            setTimeout(()=>{
                bottomRef.current?.scrollIntoView({
                    behavior:"smooth"
                });
            },100);
        }
    },[bottomRef,chatRef,count,hasInitialized])

}