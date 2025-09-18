"use client";

import * as React from "react";
import { Plus, Menu, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/src/shadcn/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/shadcn/components/ui/sheet";

type Page = {
  id: string;
  name: string;
};

type SidebarProps = {
  pages: Page[];
  activePageId: string;
  onAddPage: () => void;
  onSelectPage: (id: string) => void;
};

export function Sidebar({ pages, activePageId, onAddPage, onSelectPage }: SidebarProps) {
  const [open, setOpen] = React.useState(false);

  // Select a page
  const handleSelectPage = (id: string) => {
    onSelectPage(id);
    setOpen(false); // close mobile sidebar on select
  };

  return (
    <div className="flex">
      {/* Mobile Toggle */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <SidebarContent
            pages={pages}
            activePageId={activePageId}
            onAddPage={onAddPage}
            onSelectPage={handleSelectPage}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen border-r bg-background p-4">
        <SidebarContent
          pages={pages}
          activePageId={activePageId}
          onAddPage={onAddPage}
          onSelectPage={handleSelectPage}
        />
      </aside>
    </div>
  );
}

type SidebarContentProps = {
  pages: Page[];
  activePageId: string;
  onAddPage: () => void;
  onSelectPage: (id: string) => void;
};

function SidebarContent({
  pages,
  activePageId,
  onAddPage,
  onSelectPage,
}: SidebarContentProps) {
  return (
    <nav className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-lg">Pages</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddPage}
          aria-label="Add Page"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      {pages.map((page) => {
        return (
          <button
            key={page.id}
            onClick={() => onSelectPage(page.id)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full text-left cursor-pointer",
              activePageId === page.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted hover:text-foreground"
            )}
          >
            <FileText className="h-4 w-4" />
            <span className="flex-1">{page.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
