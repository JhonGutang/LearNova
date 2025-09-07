
import { navItems } from "@/constants/navigationItems";
import TeacherHomeLayout from "@/layout/TeacherHomeLayout";
import React from "react";
import { Button } from "@/components/ui/button";
import { ModuleData } from "@/types/backend-data";
import CardView from "@/shared/CardView";
import ListView from "@/shared/ListView";

interface ModulesPresentationalProps {
  modules: ModuleData[];
}

interface ModulesHeaderProps {
  view: "card" | "list";
  setView: (view: "card" | "list") => void;
}

const ModulesHeader: React.FC<ModulesHeaderProps> = ({ view, setView }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-bold">Modules</h2>
    <div className="flex gap-2">
      <Button
        variant={view === "card" ? "default" : "outline"}
        onClick={() => setView("card")}
      >
        Card view
      </Button>
      <Button
        variant={view === "list" ? "default" : "outline"}
        onClick={() => setView("list")}
      >
        List view
      </Button>
    </div>
  </div>
);

const ModulesPresentational: React.FC<ModulesPresentationalProps> = ({
  modules,
}) => {
  const [view, setView] = React.useState<"card" | "list">("card");

  return (
    <TeacherHomeLayout navItems={navItems} pageTitle="Modules">
      <main className="p-4">
        <ModulesHeader view={view} setView={setView} />
        {view === "card" ? (
          <CardView data={modules} />
        ) : (
          <ListView data={modules} />
        )}
      </main>
    </TeacherHomeLayout>
  );
};

export default ModulesPresentational;
