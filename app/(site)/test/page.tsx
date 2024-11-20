import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/themebutton";
const Haga = () => {
    return (  
      <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <UserButton></UserButton>
          <div><ModeToggle></ModeToggle></div>
          
        </body>
      </html>
    </>
    );
}
 
export default Haga;