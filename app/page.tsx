import React from 'react';

import Hero from '@/components/Hero';
import { Metadata } from 'next';

import ScrollUp from '@/components/Common/ScrollUp';

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Đồ Án Group 12 Nghĩa, Sơn",
};
// import { UserButton } from "@clerk/nextjs";

// export default function Home ()  {
//     return ( 
//         // <div>
//         //   <UserButton
//         //   afterSwitchSessionUrl="/"
//         //   />

//         // </div>




//      );
// }
const Home = () => (
  <div>
    <div className="header">
      <div>
      <ScrollUp />

        <Hero/>
       
      </div>
    </div>

 
  </div>
);

export default Home;
 
