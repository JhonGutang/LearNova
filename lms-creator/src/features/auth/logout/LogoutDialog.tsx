import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/src/shadcn/components/ui/dialog";
import { SidebarMenuButton } from "@/src/shadcn/components/ui/sidebar";
import { useLogout } from "./useLogout";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import { CustomToast } from "@/src/shared/CustomToast";
interface LogoutDialogProp {
  item: {
    label: string;
    icon: React.ElementType;
    href: string;
  };
}

const LogoutDialog: React.FC<LogoutDialogProp> = ({ item }) => {
  const { redirect } = useRedirectLink();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    CustomToast({
      type: "success",
      title: "Logged Out Successfully",
    });
    setLogoutDialogOpen(false);
    setTimeout(() => {
      redirect("/");
    }, 2000);
  };

  return (
    <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton
          asChild
          tooltip={item.label}
          onClick={(e) => {
            e.preventDefault();
            setLogoutDialogOpen(true);
          }}
        >

          <button type="button" className="flex items-center w-full">
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </button>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button
              type="button"
              className="px-4 py-2 rounded bg-muted text-foreground hover:bg-muted/80"
            >
              Cancel
            </button>
          </DialogClose>
          <button
            type="button"
            className="px-4 py-2 rounded bg-destructive text-destructive-foreground hover:bg-destructive/80"
            onClick={handleLogout}
          >
            Logout
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
