
import { Chapter, Course, UseProgress } from "@prisma/client";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { CourseSidebar } from "@/app/(course)/courses/[courseId]/_components/course-sidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@/components/ui/dialog";
interface CourseNavbarProps{
    course:Course & {
        chapters: (Chapter & {
           userProgress: UseProgress[] | null
        })[]
    };
    progressCount:number
}

export const CourseMobileSidebar = ({
    course,
    progressCount,
}:CourseNavbarProps) =>{
   
    return(
     
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white w-72">
                <VisuallyHidden>
                    <DialogTitle>Navigation Menu</DialogTitle>
                </VisuallyHidden>
                <CourseSidebar
                    course={course}
                    progressCount={progressCount}
                />
            </SheetContent>    
        </Sheet>

    
    )
}