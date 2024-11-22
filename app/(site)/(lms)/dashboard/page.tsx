'use client'

import { ModeToggle } from "@/components/themebutton";
import { UserButton } from "@clerk/nextjs";

const Dashboard = () => {
    return (  
   
        
        <div> <UserButton></UserButton>
        <div><ModeToggle ></ModeToggle></div></div>
         
          
       
    
    );
}
 
export default Dashboard;