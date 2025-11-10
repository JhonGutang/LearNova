'use client';

import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { dailyMotivations } from '@/mock/DailyMotivations';

const DailyMotivation: React.FC = () => {
  // Get a random motivation quote - using useMemo to persist for the day
  const motivation = useMemo(() => {
    const today = new Date();
    // Use the day of year as seed to get same quote for the day
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % dailyMotivations.length;
    return dailyMotivations[index];
  }, []);

  return (
    <Card className="p-6 bg-blue-50 border-2 border-blue-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-2 right-2">
        <Sparkles className="w-8 h-8 text-blue-300 opacity-50" />
      </div>
      <div className="relative z-10">
        <div className="mb-2">
          <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
            Daily Motivation
          </h4>
          <div className="w-12 h-0.5 bg-blue-400 mt-1"></div>
        </div>
        <p className="text-lg text-gray-800 italic mb-4 font-medium">
          &ldquo;{motivation}&rdquo;
        </p>
        <p className="text-sm text-gray-700 flex items-center gap-1">
          Keep learning, keep growing! 🚀
        </p>
      </div>
    </Card>
  );
};

export default DailyMotivation;
