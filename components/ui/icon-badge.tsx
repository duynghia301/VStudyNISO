import { LucideIcon } from "lucide-react";
import {cva, type VariantProps} from "class-variance-authority"

import { cn } from "@/lib/utils";

const backgroundVariants= cva(
    "rounded-full flex items-center justify-center",
{
    variants:{
        variant:{
            defailt:"bg-sky-100",
            success: "bg-emerald-100",
        },
        iconVariant:{
            defailt:"bg-sky-700",
            success: "bg-emerald-700",
        },
        size:{
            defailt:"p-2",
            sm:"p-1",
        },
        defaultVariants:{
            variant:"default",
            size:"default"
        }
    }
}
);

const iconVariant=cva(
    "",
    {
        variants:{
            variant:{
                defailt:"text-sky-700",
                success: "text-emerald-700",
            },
            size:{
                defailt:"h-8 w-8",
                sm:"h-4 w-4 ",
        },
        defaultVariants:{
            variant:"default",
            size:"default"
        }
    }
}
);

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>
type IconVariantProps = VariantProps<typeof iconVariant>

interface IconBadgeProps extends BackgroundVariantsProps,IconVariantProps
{
    icon: LucideIcon;
};
export const IconBadge=({
    icon:Icon,
    variant,
    size,
}:IconBadgeProps)=>{
   return(
    <div className={cn(backgroundVariants({variant,size}))}>
    <Icon className={cn(iconVariant({variant,size}))}/>

</div>
   )
}
