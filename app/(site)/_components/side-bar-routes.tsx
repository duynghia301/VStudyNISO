"use client"

import { BarChart, Compass, Layout, List, Users } from 'lucide-react';
import { SidebarItem } from './sidebar-item';
import { usePathname } from 'next/navigation';



const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search"
  }
];
const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses"
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics"
  }
  ,
  {
    icon: Users,
    label: "Class",
    href: "/class"
  }
  
];

export const SidebarRoutes = () => {

  const pathname = usePathname();
  
  const isTeeacherPage = pathname?.includes("/teacher");
  





  const routes = isTeeacherPage ? teacherRoutes: guestRoutes ;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
