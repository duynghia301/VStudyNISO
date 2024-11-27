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
        <Sheet>
            <SheetTrigger >
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                <VisuallyHidden>
                    <DialogTitle>Menu Navigation</DialogTitle> 
                </VisuallyHidden>
                <div className="w-[72px]">
                    <NavigationSideBar />
                </div>
                <CLassSideBar serverId={serverId} />
            </SheetContent>
        </Sheet>
    )
}
