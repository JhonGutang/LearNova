'use client';

import React from 'react';
import { BookOpen, Clock, TrendingUp, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  trend?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, number, trend, color }) => {
  return (
    <Card className="p-6 bg-white border-2 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${color}`}>
            {icon}
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{number}</div>
            {trend && (
              <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-green-600">{trend}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

interface StatsCardsProps {
  coursesEnrolled?: number;
  hoursLearned?: number;
  completionRate?: number;
  certificates?: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  coursesEnrolled = 12,
  hoursLearned = 48,
  completionRate = 78,
  certificates = 5
}) => {
  const stats = [
    {
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      number: coursesEnrolled.toString(),
      trend: "+2 this month",
      color: "bg-blue-100"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      number: hoursLearned.toString(),
      trend: "+5 this week",
      color: "bg-blue-100"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      number: `${completionRate}%`,
      trend: "+12%",
      color: "bg-blue-100"
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      number: certificates.toString(),
      color: "bg-blue-100"
    }
  ];

  // Changed grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -> grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 for consistent 2x2 grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          number={stat.number}
          trend={stat.trend}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsCards;
