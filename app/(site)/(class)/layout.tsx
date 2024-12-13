import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { ClerkProvider } from "@clerk/nextjs";

const ClassLayout =async ({
    children
}:{
    children:React.ReactNode;
})=> {
    return ( 
        <ClerkProvider>
            <div className="h-full ">
                <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                    <NavigationSideBar/>

                </div>
                <main className="md:pl-[72px] h-full">
                    {children}
                </main>

                
            </div>
        </ClerkProvider>
    );
}
 
export default ClassLayout;