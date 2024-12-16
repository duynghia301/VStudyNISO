import { NavbarRoutes } from "@/components/ui/navbar-routes";
import { Chapter, Course,UseProgress } from "@prisma/client"
import { CourseMobileSidebar } from "./course-mobile";

interface CourseNavbarProps{
    course:Course & {
        chapters: (Chapter & {
           userProgress: UseProgress[] | null
        })[]
    };
    progressCount:number
}

export const CourseNavbar = ({
    course,
    progressCount,
}:CourseNavbarProps)=>{
    return(
        <div className="p-4 border-b h-full flex items-center bg-sky-200 shadow-sm">
            <CourseMobileSidebar
                course={course}
                progressCount={progressCount}
            />
            <NavbarRoutes/>
        </div>
    )
}