import React from "react";
import SidebarLayout from "@/shared/layout/Sidebar";
import HeaderContents from "@/shared/HeaderContents";
import Courses from "@/features/courses/Courses";

const Homepage: React.FC = () => {
  return (
      <SidebarLayout headerChild={<HeaderContents />}>
        <Courses/>
      </SidebarLayout>
  );
};

export default Homepage;
