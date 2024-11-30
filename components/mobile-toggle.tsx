import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { CLassSideBar } from "@/components/class/class-sidebar"
import { NavigationSideBar } from "@/components/navigation/navigation-sidebar"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@/components/ui/dialog"

export const MobileToggle = ({ serverId }: { serverId: string }) => {
    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                
                <div className="w-[72px]">
                <VisuallyHidden>
                    <DialogTitle>Menu Navigation</DialogTitle> 
                </VisuallyHidden>
                <NavigationSideBar />
                </div>
                <CLassSideBar serverId={serverId} />
            </SheetContent>
        </Sheet>
    )
}
