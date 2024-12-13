"use client";

import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "../themebutton"
import { usePathname } from "next/navigation"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { SearchInput } from "../searchI-input";


export const NavbarRoutes =()=>{
    const pathname =usePathname();

    const isTeacherPae = pathname?.startsWith("/teacher");
    const isPlayerPage= pathname?.includes("/chapter");
    const isSearchPage = pathname === "/search"

    return(
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput/>
                </div>
            )}
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
                <UserButton/> 
            </div>
           
        </>  
       
    )
}