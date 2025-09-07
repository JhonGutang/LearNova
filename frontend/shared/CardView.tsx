import React from "react";
import { ModuleData } from "@/types/backend-data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface CardViewProps {
    data: ModuleData[];
}

const CardView: React.FC<CardViewProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((module, idx) => (
        <Card
          key={idx}
          className="hover:shadow-lg transition-shadow h-full flex flex-col"
        >
          <CardHeader>
            <CardTitle className="text-lg">{module.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <p className="text-gray-600">{module.description}</p>
            {/* Spacer to push the student info to the bottom */}
            <div className="flex-1" />
            <div className="flex items-center gap-2 text-gray-600 text-sm min-h-[28px]">
              <Users className="w-5 h-5 text-gray-500" />
              <span>
                {module.totalNumberOfStudents}{" "}
                {module.totalNumberOfStudents === 1 ? "student" : "students"}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardView;
