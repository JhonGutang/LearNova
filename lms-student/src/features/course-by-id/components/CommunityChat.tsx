import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { communityMessages } from "@/mock/Courses";

const CommunityChat: React.FC = () => {
    function AvatarWithImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
        return (
          <Avatar className={className}>
            <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
          </Avatar>
        );
      }

    return (
        <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community</CardTitle>
              <div className="text-xs text-gray-400">Chat with fellow students</div>
            </CardHeader>
            <CardContent className="flex flex-col p-0">
              <ScrollArea className="px-4 py-2 max-h-64">
                <ul className="space-y-4">
                  {communityMessages.map((msg, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <AvatarWithImage src={msg.user.avatar} alt={msg.user.name} className="w-8 h-8" />
                      <div>
                        <div className="font-semibold text-sm">{msg.user.name}</div>
                        <div className="text-gray-700 text-sm">{msg.message}</div>
                        <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <div className="border-t p-4 bg-gray-50 flex gap-2">
                <Input placeholder="Type your message..." disabled />
                <Button disabled>Send</Button>
              </div>
            </CardContent>
          </Card>
    )
}

export default CommunityChat