"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ActionTooltip } from "@/components/action-tooltip"

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItem = ({
    id,
    imageUrl,
    name
}: NavigationItemProps) => {

    const params = useParams();
    const router = useRouter();

    const onClick = () => {
        router.push(`/servers/${id}`)
    }

    return (
        <ActionTooltip
            side="right"
            align="center"
            lable={name}
        >
            <button
                onClick={onClick}
                className="group relative flex items-center"
            >
                <div className={cn(
                    "absolute left-0 bg-sky-200 rounded-r-full transition-all w-[4px]",
                    params?.serverId !== id ? "group-hover:h-[20px] h-[8px]" : "h-full"
                )} />

                <div className={cn(
                    "relative flex mx-3 h-[48px] w-[48px] transition-all overflow-hidden",
                    params?.serverId === id ? "bg-primary/10 text-primary rounded-[16px]" : "rounded-[24px] group-hover:rounded-[16px]"
                )}>
                    <Image
                        fill
                        src={imageUrl}
                        alt="Class"
                    />
                </div>

            </button>
        </ActionTooltip>
    )
}
