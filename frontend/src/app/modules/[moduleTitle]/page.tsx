import MainModuleContainer from "@/src/features/main-module/main-module.container";

// src/app/modules/[module-title]/page.tsx
interface ModulePageProps {
    params: {
      "moduleTitle": string;
    };
  }
  
  export default async function ModulePage({ params }: ModulePageProps) {
    return (
        <MainModuleContainer name={params['moduleTitle']}/>
    );
  }
  