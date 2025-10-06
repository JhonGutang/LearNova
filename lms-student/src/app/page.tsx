import React from "react";
import SidebarLayout from "@/shared/layout/Sidebar";
import HeaderContents from "@/shared/HeaderContents";
import Courses from "@/features/courses/Courses";

const Homepage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarLayout headerChild={<HeaderContents />}>
        <Courses/>
      </SidebarLayout>
    </div>
  );
};

export default Homepage;
