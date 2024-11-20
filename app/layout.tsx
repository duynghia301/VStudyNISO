import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ClerkProvider } from "@clerk/nextjs";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body className={cn("bg-white dark:bg-[#313338]")}> 
       
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="light"
            storageKey="VStudy-theme"
          >
      
        {children}
        </ThemeProvider>
      
      </body>
      <head/>
    </html>
    </ClerkProvider>
    
  );
}
