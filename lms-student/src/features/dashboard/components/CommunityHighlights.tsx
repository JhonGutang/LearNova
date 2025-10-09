'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useRedirectLink } from '@/hooks/useRedirect';

interface CommunityHighlight {
  id: string;
  name: string;
  action: string;
  time: string;
  avatar: string;
}

interface CommunityHighlightsProps {
  highlights?: CommunityHighlight[];
}

const CommunityHighlights: React.FC<CommunityHighlightsProps> = ({
  highlights = [
    {
      id: "1",
      name: "Alex Chen",
      action: "shared a helpful tip in Python Basics.",
      time: "3 hours ago",
      avatar: "AC"
    },
    {
      id: "2",
      name: "Maria Garcia",
      action: "completed Web Development Bootcamp.",
      time: "1 day ago",
      avatar: "MG"
    },
    {
      id: "3",
      name: "David Kim",
      action: "started a discussion about React best practices.",
      time: "1 day ago",
      avatar: "DK"
    }
  ]
}) => {
  const { redirect } = useRedirectLink();

  return (
    <Card className="p-6 bg-white border-2 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Highlights</h3>
      <div className="space-y-4 mb-4">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="flex items-start gap-3">
            <Avatar className="w-8 h-8 bg-gray-200 text-gray-700 text-xs font-semibold">
              {highlight.avatar}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{highlight.name}</span> {highlight.action}
              </p>
              <p className="text-xs text-gray-500">{highlight.time}</p>
            </div>
          </div>
        ))}
      </div>
      <Button 
        className="w-full bg-teal-600 hover:bg-teal-700 text-white"
        onClick={() => redirect("/community")}
      >
        Join the Discussion
      </Button>
    </Card>
  );
};

export default CommunityHighlights;
