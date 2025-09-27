import React from "react";
import Sidebar from "@/shared/layout/Sidebar";
import HeaderContents from "./HeaderContents";
import { courses } from "@/mock/Courses";
import CardView from "@/shared/CardView";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Homepage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar headerChild={<HeaderContents />}>
        <main className="p-6 flex flex-wrap gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex-grow min-w-[320px] max-w-[400px] flex"
              style={{ flexBasis: "320px" }}
            >
              <CardView
                {...course}
                className="flex-1"
              >
                <div className="flex gap-2">
                  <Button className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white">
                    View
                  </Button>
                  <Button
                    className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white"
                    variant="secondary"
                    aria-label="Add to Favorites"
                  >
                    <Star className="w-5 h-5" />
                  </Button>
                </div>
              </CardView>
            </div>
          ))}
        </main>
      </Sidebar>
    </div>
  );
};

export default Homepage;
