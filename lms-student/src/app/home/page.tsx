import React from "react";
import SidebarLayout from "@/shared/layout/Sidebar";
import HeaderContents from "@/shared/HeaderContents";
import { DashboardLayout } from "@/features/dashboard";

const Homepage: React.FC = () => {
  return (
      <SidebarLayout headerChild={<HeaderContents />}>
        <DashboardLayout />
      </SidebarLayout>
  );
};

export default Homepage;
