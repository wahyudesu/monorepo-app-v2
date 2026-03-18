"use client";

import { Copy, Check, Settings, Users, Puzzle, User, Link2, Trash2 } from "lucide-react";
import { useState, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { teamMembers } from "@/data/mock";
import { cn } from "@/lib/utils";
import { TeamMemberCard } from "@/components/settings/TeamMemberCard";
import { IntegrationCard } from "@/components/settings/IntegrationCard";

const tabs = [
  { id: "general", label: "General", icon: Settings, title: "General Settings", description: "Manage your project settings" },
  { id: "account", label: "Account", icon: User, title: "Account", description: "Manage your personal information" },
  { id: "team", label: "Team", icon: Users, title: "Team Members", description: "Manage your team and permissions" },
  { id: "connections", label: "Connections", icon: Puzzle, title: "Connections", description: "Manage your social media connections" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function GeneralTab() {
  const [copied, setCopied] = useState(false);
  const token = "proj_ak7x9m2nQ4wLpR8sT1vZ";

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardContent className="p-6 space-y-1">
          <p className="font-display font-semibold">Project name</p>
          <p className="text-xs text-muted-foreground">The name of your project.</p>
          <Input defaultValue="Acme Corp" className="mt-2" />
          <div className="flex items-center justify-between pt-3">
            <p className="text-xs text-muted-foreground">Maximum of 30 characters</p>
            <Button size="sm">Save</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-6 space-y-1">
          <p className="font-display font-semibold">Project token</p>
          <p className="text-xs text-muted-foreground">A unique token assigned to your project.</p>
          <Input value={token} readOnly className="mt-2 font-mono text-xs" />
          <div className="flex items-center justify-between pt-3">
            <p className="text-xs text-muted-foreground">Used to identify your project</p>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="mr-1.5 h-3.5 w-3.5 text-success" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-6 space-y-1">
          <p className="font-display font-semibold">Currency</p>
          <p className="text-xs text-muted-foreground">The currency used to display revenue on your dashboard.<br />We handle the conversion automatically for you.</p>
          <Select defaultValue="usd">
            <SelectTrigger className="mt-2 w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">🇺🇸 USD</SelectItem>
              <SelectItem value="eur">🇪🇺 EUR</SelectItem>
              <SelectItem value="gbp">🇬🇧 GBP</SelectItem>
              <SelectItem value="idr">🇮🇩 IDR</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center justify-between pt-3">
            <p className="text-xs text-muted-foreground">Used for displaying revenue across your dashboard.</p>
            <Button size="sm">Save</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-6 space-y-1">
          <p className="font-display font-semibold">Public stats</p>
          <p className="text-xs text-muted-foreground">Share your project statistics with the public.</p>
          <div className="flex items-center gap-3 pt-3">
            <Switch />
            <span className="text-sm text-muted-foreground">Currently private</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AccountTab() {
  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardContent className="p-6 space-y-4">
          <p className="font-display font-semibold">Profile</p>
          <p className="text-xs text-muted-foreground">Manage your personal information.</p>
          <div className="flex items-center gap-4 pt-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://i.pravatar.cc/150?u=me" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Change avatar</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="john@acme.com" type="email" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button size="sm">Save</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-6 space-y-4">
          <p className="font-display font-semibold">Notifications</p>
          <p className="text-xs text-muted-foreground">Configure how you receive notifications.</p>
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive daily digest of activity</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Browser push notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardContent className="p-6 space-y-2">
          <p className="font-display font-semibold text-destructive">Danger Zone</p>
          <p className="text-xs text-muted-foreground">Irreversible and destructive actions.</p>
          <div className="pt-2">
            <Button variant="destructive" size="sm">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TeamTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div />
        <Button size="sm">Invite</Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {teamMembers.map((m) => (
          <TeamMemberCard
            key={m.id}
            id={m.id}
            name={m.name}
            role={m.role}
            email={m.email}
            avatar={m.avatar}
            online={m.online}
            tasksCompleted={m.tasksCompleted}
          />
        ))}
      </div>
    </div>
  );
}

function ConnectionsTab() {
  const [connections, setConnections] = useState([
    { id: "instagram", name: "Instagram", icon: "📸", connected: true, handle: "@acme.studio", followers: "48.2K", posts: 342, color: "bg-pink-500" },
    { id: "tiktok", name: "TikTok", icon: "🎵", connected: true, handle: "@acmestudio", followers: "125.8K", posts: 89, color: "bg-gray-900" },
    { id: "whatsapp", name: "WhatsApp", icon: "💬", connected: false, handle: null, followers: null, posts: null, color: "bg-green-500" },
    { id: "facebook", name: "Facebook", icon: "📘", connected: true, handle: "Acme Corp", followers: "23.4K", posts: 156, color: "bg-blue-600" },
    { id: "youtube", name: "YouTube", icon: "▶️", connected: true, handle: "Acme Studio", followers: "72.1K", posts: 128, color: "bg-red-600" },
    { id: "linkedin", name: "LinkedIn", icon: "💼", connected: false, handle: null, followers: null, posts: null, color: "bg-blue-700" },
    { id: "twitter", name: "X (Twitter)", icon: "𝕏", connected: true, handle: "@AcmeStudio", followers: "31.4K", posts: 1204, color: "bg-black" },
    { id: "threads", name: "Threads", icon: "🧵", connected: false, handle: null, followers: null, posts: null, color: "bg-black" },
    { id: "reddit", name: "Reddit", icon: "🔴", connected: false, handle: null, followers: null, posts: null, color: "bg-orange-600" },
    { id: "pinterest", name: "Pinterest", icon: "📌", connected: false, handle: null, followers: null, posts: null, color: "bg-red-700" },
    { id: "bluesky", name: "Bluesky", icon: "🦋", connected: false, handle: null, followers: null, posts: null, color: "bg-blue-400" },
    { id: "google", name: "Google Business", icon: "🔵", connected: false, handle: null, followers: null, posts: null, color: "bg-blue-500" },
    { id: "telegram", name: "Telegram", icon: "✈️", connected: false, handle: null, followers: null, posts: null, color: "bg-blue-500" },
    { id: "snapchat", name: "Snapchat", icon: "👻", connected: false, handle: null, followers: null, posts: null, color: "bg-yellow-400" },
  ]);

  const [disconnectDialog, setDisconnectDialog] = useState<{ open: boolean; platformId: string; platformName: string }>({
    open: false,
    platformId: "",
    platformName: "",
  });

  const toggleConnection = (id: string) => {
    setConnections((prev) => prev.map((conn) => {
      if (conn.id === id) {
        if (conn.connected) {
          const platform = connections.find((c) => c.id === id);
          setDisconnectDialog({ open: true, platformId: id, platformName: platform?.name || "" });
          return conn;
        } else {
          return { ...conn, connected: true, handle: `@${conn.name.toLowerCase()}`, followers: `${Math.floor(Math.random() * 100 + 10)}K`, posts: Math.floor(Math.random() * 500 + 50) };
        }
      }
      return conn;
    }));
  };

  const confirmDisconnect = () => {
    setConnections((prev) => prev.map((conn) => {
      if (conn.id === disconnectDialog.platformId) {
        return { ...conn, connected: false, handle: null, followers: null, posts: null };
      }
      return conn;
    }));
    setDisconnectDialog({ open: false, platformId: "", platformName: "" });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {connections.map((conn) => (
          <IntegrationCard key={conn.id} {...conn} onToggle={toggleConnection} />
        ))}
      </div>

      <AlertDialog open={disconnectDialog.open} onOpenChange={(open) => setDisconnectDialog({ ...disconnectDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect {disconnectDialog.platformName}?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disconnect your {disconnectDialog.platformName} account? This will stop posting to this platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDisconnect} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold tracking-tight">{activeTabData?.title || "Settings"}</h1>
        <p className="text-sm text-muted-foreground">{activeTabData?.description || "Manage your settings"}</p>
      </div>

      <div className="flex gap-8">
        <nav className="w-[140px] shrink-0 space-y-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                activeTab === tab.id ? "bg-muted font-semibold text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 min-w-0">
          <Suspense fallback={<SettingsTabSkeleton />}>
            {activeTab === "general" && <GeneralTab />}
            {activeTab === "account" && <AccountTab />}
            {activeTab === "team" && <TeamTab />}
            {activeTab === "connections" && <ConnectionsTab />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function SettingsTabSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-48 bg-muted/30 rounded-lg" />
      <div className="h-48 bg-muted/30 rounded-lg" />
    </div>
  );
}
