'use client';

import React from 'react';
import { BookOpen, CheckCircle, Trophy, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  description: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, number, description, color }) => {
  return (
    <Card className="p-6 bg-white border-2 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{number}</div>
          <div className="text-sm text-gray-600">{description}</div>
        </div>
      </div>
    </Card>
  );
};

const StatsCards: React.FC = () => {
  const stats = [
    {
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      number: "12",
      description: "this month",
      color: "bg-blue-100"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      number: "8",
      description: "88% completion rate",
      color: "bg-green-100"
    },
    {
      icon: <Trophy className="w-6 h-6 text-purple-600" />,
      number: "24",
      description: "3 new badges",
      color: "bg-purple-100"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      number: "45h",
      description: "this month",
      color: "bg-orange-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          number={stat.number}
          description={stat.description}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsCards;
