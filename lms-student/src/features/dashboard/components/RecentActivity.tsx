'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Trophy, MessageCircle } from 'lucide-react';

interface ActivityItem {
  id: string;
  icon: React.ReactNode;
  text: string;
  time: string;
  color: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = [
    {
      id: "1",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      text: "Completed Chapter 4: Arrays in JavaScript Fundamentals",
      time: "2 hours ago",
      color: "text-green-600"
    },
    {
      id: "2",
      icon: <Trophy className="w-5 h-5 text-purple-600" />,
      text: 'Earned "Code Master" achievement',
      time: "1 day ago",
      color: "text-purple-600"
    },
    {
      id: "3",
      icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
      text: "Posted in JavaScript Community",
      time: "2 days ago",
      color: "text-blue-600"
    }
  ]
}) => {
  return (
    <Card className="p-6 bg-white border-2 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 mb-1">{activity.text}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;
