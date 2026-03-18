"use client";

import { ChevronDown, User, LogOut, Settings, UserCircle } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AppHeader() {
  const [signOutOpen, setSignOutOpen] = useState(false);

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic
    console.log("Signing out...");
    setSignOutOpen(false);
  };

  return (
    <header className="mx-auto flex w-full max-w-[1024px] items-center justify-between px-5 py-3">
      {/* Workspace Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            variant: "ghost",
            className: "gap-2 px-2 font-display text-base font-semibold hover:bg-muted/50",
          })}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            A
          </div>
          Acme Corp
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem>
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
              A
            </div>
            <span className="ml-2">Acme Corp</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex h-6 w-6 items-center justify-center rounded bg-success text-xs font-bold text-success-foreground">
              S
            </div>
            <span className="ml-2">Side Project</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>+ Create workspace...</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Account */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
            className: "rounded-full border border-border/60 bg-card/90 shadow-sm backdrop-blur-xl",
          })}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 p-0" sideOffset={8}>
          {/* Profile Section */}
          <div className="border-b border-border/50 bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold">Wahyu Ikbal Maulana</p>
                <p className="truncate text-xs text-muted-foreground">wahyu@example.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-1">
            <DropdownMenuItem className="flex cursor-pointer items-center justify-between px-3 py-2.5">
              <span className="text-sm">Profile</span>
              <UserCircle className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>

            <DropdownMenuItem className="flex cursor-pointer items-center justify-between px-3 py-2.5">
              <span className="text-sm">Preferences</span>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem
              className="flex cursor-pointer items-center justify-between px-3 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
              onSelect={(e) => {
                e.preventDefault();
                setSignOutOpen(true);
              }}
            >
              <span className="text-sm">Sign out</span>
              <LogOut className="h-4 w-4" />
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sign Out Confirmation Dialog */}
      <AlertDialog open={signOutOpen} onOpenChange={setSignOutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
