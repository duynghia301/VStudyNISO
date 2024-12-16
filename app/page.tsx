import React from 'react';

import Hero from '@/components/Hero';
import { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: "Trang chủ | VStudy",
  description: "Đồ Án Group 12 Nghĩa, Sơn",
};

export default function Home  ()  {
  return(
    <div>
      
      <div className="header ">
    
        <Header/>
        <Hero/>
      </div>

  
    </div>
  );



}
