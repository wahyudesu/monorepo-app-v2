"use client";

import { ChevronDown, Plus, UserCircle, Settings, CreditCard, LifeBuoy, LogOut } from "lucide-react";
import { UserButton, SignInButton, SignUpButton, Show, useAuth, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";

export function AppHeader() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3">
      {/* Workspace Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={buttonVariants({
            variant: "ghost",
            className:
              "group gap-2 px-2 font-display text-base font-semibold hover:bg-muted/50",
          })}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            A
          </div>
          Acme Corp
          <ChevronDown className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
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
          <DropdownMenuItem>
            <Plus className="h-4 w-4" />
            Create workspace...
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Auth Section - Clerk */}
      <div className="flex items-center gap-2">
        {/* Show sign in/up buttons when signed out */}
        <Show when="signed-out">
          <div className="flex items-center gap-2">
            <SignInButton mode="modal" forceRedirectUrl="/">
              <button
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "cursor-pointer",
                })}
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl="/">
                <button
                  className={buttonVariants({
                    size: "sm",
                    className: "cursor-pointer",
                  })}
                >
                  Get Started
                </button>
            </SignUpButton>
          </div>
        </Show>

        {/* Show user menu when signed in - using custom dropdown instead of UserButton */}
        <Show when="signed-in">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className:
                  "rounded-full border border-border/60 bg-card/90 shadow-sm backdrop-blur-xl transition-all hover:ring-2 hover:ring-primary/50",
              })}
            >
              {/* User avatar from Clerk or fallback */}
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                {user?.firstName ? (
                  <span className="text-xs font-semibold text-primary">
                    {user.firstName[0].toUpperCase()}
                  </span>
                ) : (
                  <UserCircle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
              {/* Profile Section */}
              <div className="border-b border-border/50 bg-muted/30 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                    {user?.firstName ? (
                      <span className="text-sm font-semibold text-primary">
                        {user.firstName[0].toUpperCase()}
                      </span>
                    ) : (
                      <UserCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-semibold">
                      {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user?.emailAddresses[0]?.emailAddress || "User"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.emailAddresses[0]?.emailAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-1">
                <DropdownMenuItem
                  className="flex cursor-pointer items-center justify-between px-3"
                  onClick={() => window.location.href = "/settings"}
                >
                  <span className="text-sm font-medium">Account</span>
                  <UserCircle className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem
                  className="flex cursor-pointer items-center justify-between px-3"
                  onClick={() => window.location.href = "/settings/billing"}
                >
                  <span className="text-sm font-medium">Billing</span>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex cursor-pointer items-center justify-between px-3"
                  onClick={() => window.location.href = "/settings"}
                >
                  <span className="text-sm font-medium">Settings</span>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex cursor-pointer items-center justify-between px-3"
                  onClick={() => window.location.href = "/help"}
                >
                  <span className="text-sm font-medium">Help</span>
                  <LifeBuoy className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem
                  className="flex cursor-pointer items-center justify-between px-3 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onClick={handleSignOut}
                >
                  <span className="text-sm font-medium">Sign out</span>
                  <LogOut className="h-4 w-4" />
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </Show>
      </div>
    </header>
  );
}
