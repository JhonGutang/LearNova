"use client";

import * as React from "react";
import { Plus, Menu, FileText, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/src/shadcn/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/shadcn/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shadcn/components/ui/dialog";

type Page = {
  id: string;
  name: string;
  content: string;
  pageNumber: number;
};

type SidebarProps = {
  pages: Page[];
  activePageId: string;
  onAddPage: () => void;
  onSelectPage: (id: string) => void;
  onDeletePage: (id: string) => Promise<boolean>;
  deleting?: boolean;
};

export function Sidebar({ pages, activePageId, onAddPage, onSelectPage, onDeletePage, deleting = false }: SidebarProps) {
  const [open, setOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [pageToDelete, setPageToDelete] = React.useState<Page | null>(null);

  // Select a page
  const handleSelectPage = (id: string) => {
    onSelectPage(id);
    setOpen(false); // close mobile sidebar on select
  };

  // Handle delete button click
  const handleDeleteClick = (e: React.MouseEvent, page: Page) => {
    e.stopPropagation(); // Prevent page selection
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (pageToDelete) {
      const success = await onDeletePage(pageToDelete.id);
      if (success) {
        setDeleteDialogOpen(false);
        setPageToDelete(null);
      }
    }
  };

  // Handle delete cancellation
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPageToDelete(null);
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
            onDeleteClick={handleDeleteClick}
            deleting={deleting}
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
          onDeleteClick={handleDeleteClick}
          deleting={deleting}
        />
      </aside>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{pageToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

type SidebarContentProps = {
  pages: Page[];
  activePageId: string;
  onAddPage: () => void;
  onSelectPage: (id: string) => void;
  onDeleteClick: (e: React.MouseEvent, page: Page) => void;
  deleting?: boolean;
};

function SidebarContent({
  pages,
  activePageId,
  onAddPage,
  onSelectPage,
  onDeleteClick,
  deleting = false,
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
          <div
            key={page.id}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full",
              activePageId === page.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted hover:text-foreground"
            )}
          >
            <button
              onClick={() => onSelectPage(page.id)}
              className="flex items-center gap-2 flex-1 text-left cursor-pointer"
            >
              <FileText className="h-4 w-4" />
              <span className="flex-1">{page.name}</span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-destructive"
              onClick={(e) => onDeleteClick(e, page)}
              disabled={deleting}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        );
      })}
    </nav>
  );
}
