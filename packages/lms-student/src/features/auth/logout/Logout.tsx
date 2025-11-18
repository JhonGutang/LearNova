'use client';

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "../useAuth";

// Accept controlled open/onOpenChange props from parent (Sidebar)
interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ open, onOpenChange }) => {
  const { logout, logoutLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOut className="w-5 h-5 text-red-500" />
            Log out
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to log out?
            <br />
            You will need to log in again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={logoutLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
