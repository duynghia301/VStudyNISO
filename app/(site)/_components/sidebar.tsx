import { Logo } from "./logo"
import { SidebarRoutes } from "./side-bar-routes"

export const Sidebar=()=>{
    return(
        <div className="h-full border-r flex flex-col overflow-auto dark:bg-[#1E1F22] bg-sky-300 shadow-sm">
            <div className="p-6">
             <Logo></Logo> 
            </div>
            <div>
                <div className="flex flex-col w-full">
                    <SidebarRoutes/>

                </div>
            </div>
        </div>
    )
}