"use client";

import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "../themebutton"
import { usePathname, useRouter } from "next/navigation"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import { LogOut } from "lucide-react"


export const NavbarRoutes =()=>{
    const pathname =usePathname();

    const isTeacherPae = pathname?.startsWith("/teacher");
    const isPlayerPage= pathname?.includes("/chapter");


    return(
        <div className="flex gap-x-2 ml-auto">
            {isTeacherPae || isPlayerPage ?(
                <Link href="/dashboard">
                <Button size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2"/>
                    Exit
                </Button>
                 </Link>
            )
            :(
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                       
                        Teacher mode
                    </Button>
                 </Link>
            
            )
            }

 <ModeToggle/>
<UserButton/> </div>
           
            
       
    )
}