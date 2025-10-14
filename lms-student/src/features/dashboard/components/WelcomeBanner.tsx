'use client';

import React from 'react';
import { Star, Flame, Gem, Trophy } from 'lucide-react';

interface WelcomeBannerProps {
  userName?: string;
  level?: number;
  streak?: number;
  xp?: number;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  userName = "Sarah",
  level = 12,
  streak = 15,
  xp = 2450
}) => {
  return (
    <div className="relative bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg px-6 py-5 mb-6">
      {/* Trophy icon faded in the top right */}
      <Trophy
        className="absolute top-3 right-4 w-12 h-12 text-white/10 pointer-events-none select-none"
        aria-hidden="true"
      />
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Welcome back, {userName}!</h2>
        <p className="text-xs text-white/80 mb-4">
          Ready to continue your learning journey? You&apos;re doing great!
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {/* Level */}
        <div className="flex items-center gap-1 text-sm font-medium text-white">
          <Star className="w-4 h-4 text-yellow-400" fill="#facc15" />
          <span className="font-semibold">Level {level}</span>
        </div>
        {/* Streak */}
        <div className="flex items-center gap-1 text-sm font-medium text-white">
          <Flame className="w-4 h-4 text-orange-400" fill="#fb923c" />
          <span className="font-semibold">{streak} Day Streak</span>
        </div>
        {/* XP */}
        <div className="flex items-center gap-1 text-sm font-medium text-white">
          <Gem className="w-4 h-4 text-blue-200" fill="#bae6fd" />
          <span className="font-semibold">{xp.toLocaleString()} XP</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
