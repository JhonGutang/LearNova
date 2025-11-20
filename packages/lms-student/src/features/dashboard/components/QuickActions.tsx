'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Users, Trophy, BarChart3 } from 'lucide-react';
import { useRedirectLink } from '@/hooks/useRedirect';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}

const FilledIconWrapper: React.FC<{ bgColor: string; children: React.ReactNode }> = ({
  bgColor,
  children,
}) => (
  <span
    className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColor}`}
    style={{
      backgroundColor: bgColor,
      display: 'inline-flex',
    }}
  >
    {children}
  </span>
);

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, onClick, color }) => {
  return (
    <Button
      variant="outline"
      className={`cursor-pointer w-full justify-start gap-3 h-14 text-left font-medium ${color} hover:shadow-md transition-all`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

const QuickActions: React.FC = () => {
  const { redirect } = useRedirectLink();

  const actions = [
    {
      icon: (
        <FilledIconWrapper bgColor="bg-teal-700">
          <Search className="w-6 h-6 text-white" />
        </FilledIconWrapper>
      ),
      label: "Browse Courses",
      onClick: () => redirect("/courses"),
      color: "border-teal-200 hover:bg-teal-50 hover:border-teal-300"
    },
    {
      icon: (
        <FilledIconWrapper bgColor="bg-blue-700">
          <Users className="w-6 h-6 text-white" />
        </FilledIconWrapper>
      ),
      label: "Join Community",
      onClick: () => redirect("/community"),
      color: "border-blue-200 hover:bg-blue-50 hover:border-blue-300"
    },
    {
      icon: (
        <FilledIconWrapper bgColor="bg-purple-700">
          <Trophy className="w-6 h-6 text-white" />
        </FilledIconWrapper>
      ),
      label: "View Achievements",
      onClick: () => redirect("/achievements"),
      color: "border-purple-200 hover:bg-purple-50 hover:border-purple-300"
    },
    {
      icon: (
        <FilledIconWrapper bgColor="bg-green-700">
          <BarChart3 className="w-6 h-6 text-white" />
        </FilledIconWrapper>
      ),
      label: "Track Progress",
      onClick: () => redirect("/progress"),
      color: "border-green-200 hover:bg-green-50 hover:border-green-300"
    }
  ];

  return (
    <Card className="p-6 bg-white border-2 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <QuickAction
            key={index}
            icon={action.icon}
            label={action.label}
            onClick={action.onClick}
            color={action.color}
          />
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
