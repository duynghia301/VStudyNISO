import type { Metadata } from "next";
import "./globals.css";
import {ClerkProvider } from "@clerk/nextjs";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/components/providers/toaster-provider";



export const metadata: Metadata = {
  title: " VStudy",
  description: "Học với nhau",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ClerkProvider>
      <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head />
      <body> 
       
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="light"
          >
         <ToastProvider/>
        {children}
   
        </ThemeProvider>
      
      </body>
      <head/>
    </html>
   
              
      
    </ClerkProvider>
    
  );
}
