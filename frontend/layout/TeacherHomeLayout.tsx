import CustomSidebar from "@/shared/CustomSidebar";
import React from "react";

interface TeacherHomeLayoutProps {
    navItems: {
        label: string;
        icon: React.ElementType;
        href: string;
      }[];
      pageTitle: string,
      children: React.ReactNode;
}

const TeacherHomeLayout: React.FC<TeacherHomeLayoutProps> = ({ navItems, pageTitle, children }) => {
  return (
    <CustomSidebar navItems={navItems} pageTitle={pageTitle} >
        { children }
    </CustomSidebar>
  );
};

export default TeacherHomeLayout;
