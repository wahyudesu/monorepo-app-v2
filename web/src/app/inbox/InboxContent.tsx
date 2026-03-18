"use client";

import { useState, useMemo } from "react";
import { Search, Send, Paperclip, Smile, MoreVertical, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Instagram, Twitter, Youtube, Music, MessageSquare, Star } from "lucide-react";

type Platform = "all" | "instagram" | "tiktok" | "twitter" | "youtube";
type TypeFilter = "all" | "message" | "comment";

interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  isFromMe: boolean;
}

interface Conversation {
  id: string;
  platform: "instagram" | "tiktok" | "twitter" | "youtube";
  type: "message" | "comment";
  sender: string;
  avatar: string;
  isOnline: boolean;
  isRead: boolean;
  isStarred: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
  mediaPost?: string;
}

const platformConfig = {
  instagram: { icon: Instagram, color: "text-pink-500", bg: "bg-pink-500/10", name: "Instagram" },
  tiktok: { icon: Music, color: "text-gray-100", bg: "bg-gray-100/10 dark:bg-gray-800/50", name: "TikTok" },
  twitter: { icon: Twitter, color: "text-blue-400", bg: "bg-blue-500/10", name: "Twitter" },
  youtube: { icon: Youtube, color: "text-red-500", bg: "bg-red-500/10", name: "YouTube" },
};

const mockConversations: Conversation[] = [
  {
    id: "1",
    platform: "instagram",
    type: "comment",
    sender: "sarah_design",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    isOnline: true,
    isRead: false,
    isStarred: false,
    lastMessage: "That sounds great! When can we start?",
    lastMessageTime: "5m ago",
    unreadCount: 2,
    mediaPost: "Product Launch Reel",
    messages: [
      { id: "m1", content: "Hi! I love your content. Can we collaborate on a project?", timestamp: "10:30 AM", isFromMe: false },
      { id: "m2", content: "Hey Sarah! Thanks for reaching out. I'd love to hear more about your idea!", timestamp: "10:32 AM", isFromMe: true },
      { id: "m3", content: "Basically I'm a fashion designer and I think your aesthetic would be perfect for my new collection launch", timestamp: "10:33 AM", isFromMe: false },
      { id: "m4", content: "That sounds amazing! Let's schedule a call to discuss details.", timestamp: "10:35 AM", isFromMe: true },
      { id: "m5", content: "That sounds great! When can we start?", timestamp: "10:36 AM", isFromMe: false },
    ],
  },
  {
    id: "2",
    platform: "tiktok",
    type: "comment",
    sender: "mike_creator",
    avatar: "https://i.pravatar.cc/150?u=mike",
    isOnline: false,
    isRead: false,
    isStarred: true,
    lastMessage: "This is exactly what I was looking for! 🔥",
    lastMessageTime: "12m ago",
    unreadCount: 1,
    mediaPost: "Behind the scenes of our new campaign",
    messages: [
      { id: "m1", content: "This is exactly what I was looking for! 🔥", timestamp: "9:15 AM", isFromMe: false },
    ],
  },
  {
    id: "3",
    platform: "twitter",
    type: "message",
    sender: "tech_enthusiast",
    avatar: "https://i.pravatar.cc/150?u=tech",
    isOnline: true,
    isRead: true,
    isStarred: false,
    lastMessage: "Great thread! Would love to see more content about this topic.",
    lastMessageTime: "1h ago",
    unreadCount: 0,
    messages: [
      { id: "m1", content: "Great thread! Would love to see more content about this topic.", timestamp: "8:00 AM", isFromMe: false },
      { id: "m2", content: "Thanks! I'll definitely make a part 2 soon 👍", timestamp: "8:05 AM", isFromMe: true },
    ],
  },
  {
    id: "4",
    platform: "youtube",
    type: "comment",
    sender: "video_fan",
    avatar: "https://i.pravatar.cc/150?u=video",
    isOnline: false,
    isRead: true,
    isStarred: false,
    lastMessage: "The editing quality is amazing! What software do you use?",
    lastMessageTime: "2h ago",
    unreadCount: 0,
    mediaPost: "How We Built Our Brand in 6 Months",
    messages: [
      { id: "m1", content: "The editing quality is amazing! What software do you use?", timestamp: "Yesterday", isFromMe: false },
      { id: "m2", content: "I use Premiere Pro and After Effects mainly!", timestamp: "Yesterday", isFromMe: true },
    ],
  },
  {
    id: "5",
    platform: "instagram",
    type: "message",
    sender: "brand_official",
    avatar: "https://i.pravatar.cc/150?u=brand",
    isOnline: false,
    isRead: false,
    isStarred: true,
    lastMessage: "We'd like to discuss a potential partnership. DM us back!",
    lastMessageTime: "3h ago",
    unreadCount: 3,
    messages: [
      { id: "m1", content: "Hey! We've been following your content and love what you're doing.", timestamp: "2 days ago", isFromMe: false },
      { id: "m2", content: "We'd like to discuss a potential partnership. DM us back!", timestamp: "3h ago", isFromMe: false },
    ],
  },
  {
    id: "6",
    platform: "tiktok",
    type: "comment",
    sender: "dance_lover",
    avatar: "https://i.pravatar.cc/150?u=dance",
    isOnline: true,
    isRead: true,
    isStarred: false,
    lastMessage: "Teach me this dance pleeease! 🙏",
    lastMessageTime: "5h ago",
    unreadCount: 0,
    mediaPost: "Trending Challenge Video",
    messages: [
      { id: "m1", content: "Teach me this dance pleeease! 🙏", timestamp: "5h ago", isFromMe: false },
      { id: "m2", content: "Haha I'll make a tutorial soon! 😄", timestamp: "4h ago", isFromMe: true },
    ],
  },
];

export function InboxContent() {
  const [platform, setPlatform] = useState<Platform>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState("");

  // Filter conversations
  const filteredConversations = useMemo(() => {
    return mockConversations.filter((conv) => {
      const matchesPlatform = platform === "all" || conv.platform === platform;
      const matchesType = typeFilter === "all" || conv.type === typeFilter;
      const matchesSearch =
        searchQuery === "" ||
        conv.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPlatform && matchesType && matchesSearch;
    });
  }, [platform, typeFilter, searchQuery]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      content: messageInput,
      timestamp: "Just now",
      isFromMe: true,
    };

    // In a real app, you'd update the backend
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mx-auto max-w-7xl h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Inbox</h1>
          <p className="text-sm text-muted-foreground">Manage conversations across all platforms</p>
        </div>

        {/* Platform Filter - Select */}
        <div className="flex items-center gap-2">
          <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>

          {/* Type Filter - Select */}
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as TypeFilter)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="comment">Comments</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* CRM Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-6rem)]">
        {/* Conversation List */}
        <Card className="lg:col-span-1 border-border/50 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="p-3 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
          </div>

          {/* Conversation List */}
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">No conversations found</p>
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const config = platformConfig[conv.platform];
                  const Icon = config.icon;
                  const isSelected = selectedConversation?.id === conv.id;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl transition-all",
                        "hover:bg-muted/50",
                        isSelected ? "bg-muted" : "",
                        !conv.isRead && "bg-primary/5"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={conv.avatar} />
                            <AvatarFallback>{conv.sender[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          {conv.isOnline && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-sm truncate">{conv.sender}</span>
                              {conv.isStarred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{conv.lastMessageTime}</span>
                          </div>

                          <div className="flex items-center gap-1.5 mb-1">
                            <div className={cn("flex items-center", config.color)}>
                              <Icon className="h-3 w-3" />
                            </div>
                            <span className="text-[10px] text-muted-foreground capitalize">{config.name}</span>
                          </div>

                          <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                        </div>

                        {conv.unreadCount > 0 && (
                          <Badge className="h-5 min-w-5 px-1 flex items-center justify-center bg-primary text-primary-foreground text-[10px]">
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat View */}
        <Card className={cn(
          "hidden lg:flex lg:col-span-2 border-border/50 overflow-hidden flex-col",
          !selectedConversation && "items-center justify-center"
        )}>
          {!selectedConversation ? (
            <div className="text-center p-8">
              <MessageSquare className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.avatar} />
                      <AvatarFallback>{selectedConversation.sender[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{selectedConversation.sender}</h3>
                        {selectedConversation.isOnline && (
                          <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">
                            Online
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {(() => {
                          const config = platformConfig[selectedConversation.platform];
                          const Icon = config.icon;
                          return (
                            <>
                              <Icon className={cn("h-3 w-3", config.color)} />
                              <span className="text-xs text-muted-foreground">{config.name}</span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>

                {selectedConversation.mediaPost && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                    <MessageSquare className="h-3 w-3" />
                    <span>On: {selectedConversation.mediaPost}</span>
                  </div>
                )}
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.isFromMe ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[70%] rounded-2xl px-4 py-2.5",
                          msg.isFromMe
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted rounded-bl-sm"
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <p className={cn(
                          "text-[10px] mt-1",
                          msg.isFromMe ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="pr-10 min-h-[44px] resize-none"
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    size="icon"
                    className="h-11 w-11 shrink-0"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>

        {/* Mobile Chat View */}
        {selectedConversation && (
          <Card className="lg:hidden fixed inset-0 z-50 flex flex-col rounded-none">
            {/* Mobile Header */}
            <div className="p-4 border-b border-border/50 flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setSelectedConversation(null)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.avatar} />
                <AvatarFallback>{selectedConversation.sender[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{selectedConversation.sender}</h3>
                <p className="text-xs text-muted-foreground capitalize">{selectedConversation.platform}</p>
              </div>
            </div>

            {/* Mobile Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn("flex", msg.isFromMe ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-2.5",
                        msg.isFromMe
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <p
                        className={cn(
                          "text-[10px] mt-1",
                          msg.isFromMe ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Mobile Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex items-end gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!messageInput.trim()} size="icon">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
