import React from "react";
import Sidebar from "@/shared/layout/Sidebar";
import HeaderContents from "@/shared/HeaderContents";
import Courses from "@/features/courses/Courses";

const Homepage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar headerChild={<HeaderContents />}>
        <Courses/>
      </Sidebar>
    </div>
  );
};

export default Homepage;
