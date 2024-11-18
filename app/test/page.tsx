import { UserButton } from "@clerk/nextjs";

const Haga = () => {
    return (  
        <div>
        <UserButton
        afterSwitchSessionUrl="/"
        />
      

      </div>
    );
}
 
export default Haga;