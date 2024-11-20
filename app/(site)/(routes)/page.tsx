import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/themebutton";
const Dashboard = () => {
    return (  
   
      <div className="header">
    
     
    <body>
          <UserButton></UserButton>
          <div><ModeToggle></ModeToggle></div>
          
        </body>
  
   
    </div>
       
   
 
    );
}
 
export default Dashboard;