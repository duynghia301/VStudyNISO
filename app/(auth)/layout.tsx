const AuthLayout = ({ children}:{children: React.ReactNode}) => {
    
    return (
        <div className="h-full place-items-center">
            {children}
        </div>
      );
} 
 
export default AuthLayout;