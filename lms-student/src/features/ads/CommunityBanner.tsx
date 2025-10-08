import React from "react";
import { Button } from "@/components/ui/button";
import { useRedirectLink } from "@/hooks/useRedirect";

const CommunityBanner: React.FC = () => {
  const { redirect } = useRedirectLink();

  const handleExploreCommunity = () => {
    redirect("/community");
  };

  return (
    <div
      className="w-full bg-gradient-to-r from-teal-400 to-teal-800 rounded-lg p-6 md:p-8 text-white min-h-[120px]"
      style={{ minHeight: 120 }}
    >
      <div className="max-w-4xl">
        {/* Main Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          Join the Student Community!
        </h2>
        
        {/* Description */}
        <p className="text-base md:text-lg mb-4 text-white/90">
          Connect, share, and learn with fellow students. Ask questions, share tips, and grow together!
        </p>
        
        {/* Button */}
        <Button
          onClick={handleExploreCommunity}
          className="bg-white text-teal-800 hover:bg-white/90 hover:text-teal-900 font-medium px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Explore Community
        </Button>
      </div>
    </div>
  );
};

export default CommunityBanner;
