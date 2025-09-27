import React from "react";
import Sidebar from "@/shared/layout/Sidebar";

const Homepage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar>
          <main>this is homepage</main>
      </Sidebar>
    </div>
  );
};

export default Homepage;
