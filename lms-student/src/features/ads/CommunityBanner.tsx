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
      className="w-full border-4 border-teal-500 rounded-lg p-6 md:p-8 min-h-[120px] text-teal-900 bg-white shadow-lg"
      style={{ minHeight: 120 }}
    >
      <div className="max-w-4xl">
        {/* Main Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          Welcome to the Community
        </h2>
        
        {/* Description */}
        <p className="text-base md:text-lg mb-4 text-teal-800/90">
          Connect, share, and learn with fellow students. Ask questions, share tips, and grow together!
        </p>
      </div>
    </div>
  );
};

export default CommunityBanner;
