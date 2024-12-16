import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@/components/ui/dialog";

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-sky-800">
                <VisuallyHidden>
                    <DialogTitle>Navigation Menu</DialogTitle>
                </VisuallyHidden>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
