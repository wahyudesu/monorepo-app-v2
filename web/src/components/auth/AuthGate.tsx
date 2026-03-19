"use client";

import { useAuth } from "@clerk/nextjs";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Lock, UserPlus, LogIn, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AuthGateProps {
  children: React.ReactNode;
  /** Custom title for the login dialog */
  title?: string;
  /** Custom description for the login dialog */
  description?: string;
  /** If true, gate is always active. If false, only activates on interaction */
  requireInteraction?: boolean;
  /** Custom trigger element - if provided, gate activates when clicked */
  trigger?: React.ReactNode;
}

/**
 * AuthGate - Wraps content that requires authentication for interaction.
 *
 * Shows content in a "view-only" state for guests.
 * When guests try to interact, shows a login dialog.
 *
 * @example
 * // Auto-detects interaction
 * <AuthGate>
 *   <InteractiveContent />
 * </AuthGate>
 *
 * @example
 * // Always show gate (for empty states)
 * <AuthGate requireInteraction={false}>
 *   <EmptyState />
 * </AuthGate>
 */
export function AuthGate({
  children,
  title = "Sign in to continue",
  description = "You need to sign in to use this feature. Don't have an account? Sign up for free!",
  requireInteraction = true,
  trigger,
}: AuthGateProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // If auth is still loading, show children
  if (!isLoaded) {
    return <>{children}</>;
  }

  // If user is signed in, show children normally
  if (isSignedIn) {
    return <>{children}</>;
  }

  // Guest user - show gated content
  if (trigger) {
    return (
      <>
        <div
          onClick={() => setShowLoginDialog(true)}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
        >
          {trigger}
        </div>
        <LoginDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
          title={title}
          description={description}
        />
      </>
    );
  }

  if (requireInteraction) {
    return (
      <>
        <div
          onClick={() => setShowLoginDialog(true)}
          className="relative"
          role="button"
          tabIndex={0}
        >
          {children}
          {/* Subtle hover overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-muted/20 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <LoginDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
          title={title}
          description={description}
        />
      </>
    );
  }

  // Always show gate (for empty states, call-to-actions, etc.)
  return (
    <>
      <div
        onClick={() => setShowLoginDialog(true)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        title={title}
        description={description}
      />
    </>
  );
}

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

function LoginDialog({
  open,
  onOpenChange,
  title,
  description,
}: LoginDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-border/60 bg-card/95 backdrop-blur-xl sm:max-w-md">
        <DialogHeader className="text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
            <Lock className="h-7 w-7 text-primary" />
          </div>

          <DialogTitle className="text-xl font-semibold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <SignInButton mode="modal" forceRedirectUrl="/">
            <Button
              size="lg"
              className="h-12 w-full cursor-pointer rounded-2xl font-semibold"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </SignInButton>

          <SignUpButton mode="modal" forceRedirectUrl="/">
            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full cursor-pointer rounded-2xl font-semibold"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Create Free Account
            </Button>
          </SignUpButton>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          <span>Join to unlock all features</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Import useState at the top
import { useState } from "react";
