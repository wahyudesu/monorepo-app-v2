"use client";

import { useState } from "react";
import { Sparkles, Copy, Plus, RefreshCw, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Composer, type Tool } from "@/components/ui/composer";
import { cn } from "@/lib/utils";

type Tone = "professional" | "casual" | "funny" | "inspirational" | "educational";

interface GeneratedPost {
  id: string;
  content: string;
  platform: string;
  tone: Tone;
}

// Mock tools for the composer
const mockTools: Tool[] = [
  { name: "social_post", category: "content", description: "Create a social media post" },
  { name: "caption", category: "content", description: "Generate a photo caption" },
  { name: "thread", category: "content", description: "Create a Twitter thread" },
  { name: "hashtags", category: "content", description: "Generate relevant hashtags" },
  { name: "rewrite", category: "edit", description: "Rewrite your text" },
  { name: "shorten", category: "edit", description: "Make text more concise" },
];

const tones: { value: Tone; label: string; color: string }[] = [
  { value: "professional", label: "Professional", color: "bg-blue-500" },
  { value: "casual", label: "Casual", color: "bg-green-500" },
  { value: "funny", label: "Funny", color: "bg-yellow-500" },
  { value: "inspirational", label: "Inspirational", color: "bg-purple-500" },
  { value: "educational", label: "Educational", color: "bg-orange-500" },
];

// Mock AI generation
const generatePosts = (prompt: string, tone: Tone): GeneratedPost[] => {
  const templates = [
    {
      platform: "Instagram",
      content: `✨ ${prompt}\n\nHere's what I've been working on lately. The response has been amazing!\n\n📌 Key takeaway: Keep pushing forward\n\nDrop a 🙌 if you relate!\n\n#${prompt.split(" ")[0] || "viral"} #fyp #trending`,
    },
    {
      platform: "Twitter/X",
      content: `${prompt}\n\nA thread 🧵\n\n1/ Start with a hook\n\n2/ Add value with each tweet\n\n3/ Engage with your audience\n\n4/ Consistency is key\n\nFollow for more! 🚀`,
    },
    {
      platform: "LinkedIn",
      content: `${prompt}\n\nHere's my perspective:\n\n→ Point 1: The foundation matters\n→ Point 2: Execution is everything\n→ Point 3: Results follow action\n\nWhat's your experience? I'd love to hear your thoughts below.\n\n#${prompt.split(" ")[0] || "professional"} #growth`,
    },
    {
      platform: "TikTok",
      content: `Wait, you need to hear this about ${prompt}!\n\n✨ POV: When you realize...\n\nThis changed everything for me 💭\n\n#fyp #viral #${prompt.split(" ")[0] || "trending"}\n\n♬ original sound`,
    },
  ];

  return templates.map((template, index) => ({
    id: `${Date.now()}-${index}`,
    ...template,
    tone,
  }));
};

export default function AIChatPage() {
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTone, setSelectedTone] = useState<Tone>("casual");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSubmit = async (message: string) => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);

    // Simulate AI generation
    setTimeout(() => {
      const generatedPosts = generatePosts(message, selectedTone);
      setPosts(generatedPosts);
      setIsLoading(false);
    }, 1500);
  };

  const handleRegenerate = () => {
    if (posts.length === 0 || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      const newPosts = generatePosts(posts[0].content.split("\n")[0].replace(/[✨📌]/g, "").trim(), selectedTone);
      setPosts(newPosts);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveDraft = (post: GeneratedPost) => {
    // TODO: Implement save to drafts
    console.log("Saving draft:", post);
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI Content Creator
        </h1>
        <p className="text-sm text-muted-foreground">Generate social media content with AI</p>
      </div>

      {/* Tone Selector */}
      <Card className="mb-4 border-border/50 p-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Tone:</span>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <button
                key={t.value}
                onClick={() => setSelectedTone(t.value)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                  selectedTone === t.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <span className={cn("w-2 h-2 rounded-full", t.color)} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Composer Input */}
      <div className="mb-6">
        <Composer
          placeholder="Describe what content you want to create... (e.g., 'A motivational post about morning routines')"
          onSubmit={handleSubmit}
          tools={mockTools}
          isLoading={isLoading}
          autoFocus
        />
      </div>

      {/* Results Section */}
      {posts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Generated Posts</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              Regenerate
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.id} className="border-border/50 overflow-hidden">
                <div className="border-b border-border/50 px-4 py-2 flex items-center justify-between bg-muted/30">
                  <Badge variant="outline">{post.platform}</Badge>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleCopy(post.content, post.id)}
                    >
                      {copiedId === post.id ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleSaveDraft(post)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm whitespace-pre-wrap text-foreground/90 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {posts.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <Sparkles className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No posts generated yet</p>
          <p className="text-sm text-muted-foreground/60 mt-1">
            Describe what content you want to create above
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && posts.length === 0 && (
        <div className="text-center py-16">
          <div className="flex gap-1 justify-center mb-4">
            <span className="w-3 h-3 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-3 h-3 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-3 h-3 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <p className="text-muted-foreground">Generating content...</p>
        </div>
      )}
    </div>
  );
}
