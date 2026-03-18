"use client";

import { useState } from "react";
import { Sparkles, Copy, Plus, RefreshCw, Check, Info, X, Hash, Users, BarChart3, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Platform = "threads" | "linkedin" | "twitter" | "instagram" | "tiktok";
type ContentType = "single" | "thread" | "carousel" | "video";
type Tone = "professional" | "casual" | "inspirational" | "educational" | "friendly" | "storytelling";
type ScriptGoal = "engagement" | "sales" | "branding" | "education" | "entertainment";

interface ToneInfo {
  value: Tone;
  label: string;
  color: string;
  shortDesc: string;
}

interface GeneratedScript {
  id: string;
  platform: Platform;
  contentType: ContentType;
  content: string;
  hashtags: string[];
  cta: string;
  tips: string[];
}

interface PlatformConfig {
  id: Platform;
  name: string;
  icon: string;
  color: string;
  description: string;
  maxChars: number;
  supports: ContentType[];
  bestFor: string[];
}

const platforms: PlatformConfig[] = [
  { id: "threads", name: "Threads", icon: "🧵", color: "bg-black dark:bg-white", description: "Text & visual conversations", maxChars: 500, supports: ["single", "thread"], bestFor: ["Engagement", "Discussions", "Quick updates"] },
  { id: "linkedin", name: "LinkedIn", icon: "💼", color: "bg-blue-600", description: "Professional networking", maxChars: 3000, supports: ["single", "carousel", "video"], bestFor: ["Thought leadership", "Industry insights", "B2B"] },
  { id: "twitter", name: "Twitter/X", icon: "𝕏", color: "bg-black", description: "Real-time conversations", maxChars: 280, supports: ["single", "thread"], bestFor: ["News", "Trends", "Quick thoughts"] },
  { id: "instagram", name: "Instagram", icon: "📸", color: "bg-gradient-to-br from-purple-500 to-pink-500", description: "Visual storytelling", maxChars: 2200, supports: ["single", "carousel", "video"], bestFor: ["Visual content", "Lifestyle", "Branding"] },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "bg-black", description: "Short-form video", maxChars: 150, supports: ["video"], bestFor: ["Viral content", "Trends", "Gen Z audience"] },
];

const contentTypes: { value: ContentType; label: string; icon: string; description: string }[] = [
  { value: "single", label: "Single Post", icon: "📝", description: "One standalone post" },
  { value: "thread", label: "Thread Series", icon: "🧵", description: "Multi-part thread (Twitter/Threads)" },
  { value: "carousel", label: "Carousel/Swipe", icon: "🎠", description: "Multi-slide content (LinkedIn/IG)" },
  { value: "video", label: "Video Script", icon: "🎬", description: "Script for short-form video" },
];

const tones: ToneInfo[] = [
  { value: "professional", label: "Professional", color: "bg-blue-500", shortDesc: "Expert & authoritative" },
  { value: "casual", label: "Casual", color: "bg-green-500", shortDesc: "Friendly & relaxed" },
  { value: "inspirational", label: "Inspirational", color: "bg-purple-500", shortDesc: "Motivating & uplifting" },
  { value: "educational", label: "Educational", color: "bg-orange-500", shortDesc: "Informative & teaching" },
  { value: "friendly", label: "Friendly", color: "bg-pink-500", shortDesc: "Warm & welcoming" },
  { value: "storytelling", label: "Storytelling", color: "bg-indigo-500", shortDesc: "Narrative & engaging" },
];

const goals: { value: ScriptGoal; label: string; icon: string; description: string }[] = [
  { value: "engagement", label: "Boost Engagement", icon: "💬", description: "Get likes, comments, shares" },
  { value: "sales", label: "Sales/Conversion", icon: "🛒", description: "Drive purchases or sign-ups" },
  { value: "branding", label: "Brand Awareness", icon: "🎯", description: "Build your brand identity" },
  { value: "education", label: "Educate", icon: "📚", description: "Share knowledge and insights" },
  { value: "entertainment", label: "Entertainment", icon: "🎭", description: "Entertain and delight audience" },
];

// Generate platform-specific scripts
const generateScript = (
  topic: string,
  platform: Platform,
  contentType: ContentType,
  tone: Tone,
  goal: ScriptGoal
): GeneratedScript => {
  const platformConfig = platforms.find(p => p.id === platform);

  // Generate hashtags based on topic and platform
  const generateHashtags = (topic: string, platform: Platform): string[] => {
    const words = topic.toLowerCase().split(" ").filter(w => w.length > 2);
    const baseTags = words.map(w => `#${w.replace(/[^a-z0-9]/g, "")}`);
    const platformTags: Record<Platform, string[]> = {
      threads: ["#Threads", "#ThreadLife"],
      linkedin: ["#LinkedIn", "#Professional", "#Networking"],
      twitter: ["#Twitter", "#X", "#TechTwitter"],
      instagram: ["#Instagram", "#InstaGood", "#ContentCreator"],
      tiktok: ["#TikTok", "#FYP", "#ForYou", "#viral"],
    };
    return [...baseTags.slice(0, 3), ...platformTags[platform]];
  };

  // Generate CTA based on goal
  const generateCTA = (goal: ScriptGoal): string => {
    const ctas: Record<ScriptGoal, string[]> = {
      engagement: ["💬 Drop your thoughts below!", "👆 What do you think?", "🔥 Save this for later!", "Share with someone who needs this!"],
      sales: ["🔗 Link in bio", "DM me for info", "Limited spots available!", "Book now - link in bio"],
      branding: ["Follow for more insights", "Join the community", "Turn on notifications 🔔", "Share your experience"],
      education: ["💡 What did you learn?", "Save this post!", "Share with a friend who needs this", "Follow for daily tips"],
      entertainment: ["👇 Double tap if you agree!", "Send to a friend who needs a laugh", "Follow for more content", "Tag someone who needs to see this"],
    };
    return ctas[goal][Math.floor(Math.random() * ctas[goal].length)];
  };

  // Generate tips based on platform and content type
  const generateTips = (platform: Platform, contentType: ContentType): string[] => {
    const tips: string[] = [];
    if (platform === "threads" || platform === "twitter") {
      tips.push("Post when your audience is most active", "Use 2-3 relevant hashtags max", "Engage with replies within 30 min");
    } else if (platform === "linkedin") {
      tips.push("Best times: Tue-Thu, 8-10am or 5-6pm", "Tag relevant people/companies", "Use line breaks for readability");
    } else if (platform === "instagram") {
      tips.push("Use 3-5 hashtags max for reach", "First 3 seconds are crucial for Reels", "Respond to all comments first hour");
    } else if (platform === "tiktok") {
      tips.push("Hook in first 1-2 seconds", "Use trending sounds when relevant", "Post 1-4x daily for growth");
    }
    if (contentType === "thread" || contentType === "carousel") {
      tips.push("Last slide should have a CTA", "Keep each part under 150 chars");
    }
    return tips;
  };

  // Generate content based on platform, tone, and goal
  let content = "";

  if (platform === "threads" && contentType === "thread") {
    content = `🧵 ${topic}

1/${goal === "engagement" ? "Let's talk about something important..." : "Here's what most people get wrong:"}

${tone === "casual" ? "Okay, so here's the thing —" : "Let's break this down:"}

${topic.split(" ").slice(0, 5).join(" ")} isn't just about ${topic.split(" ")[0]}. It's about the bigger picture.

2/${goal === "education" ? "The truth is:" : "Here's where it gets interesting:"}

Most people miss this because they're focused on the wrong thing.

The real key? Consistency + Strategy.

3/Quick story:

I used to think ${topic.split(" ")[0] || "it"} was just about luck.

Until I realized:

→ It's about showing up daily
→ It's about providing value
→ It's about building genuine connections

4/So if you're struggling with ${topic.split(" ")[0] || "this"}, remember:

You're not behind. You're just on your own timeline.

Keep going. 💪

5/${generateCTA(goal)}`;
  } else if (platform === "linkedin") {
    content = `${topic === topic.toUpperCase() ? topic : topic.charAt(0).toUpperCase() + topic.slice(1)}

Here's my perspective:

${tone === "professional" ? "After analyzing this topic extensively," : "I've been thinking about this a lot,"}

${goal === "education" ? "Here's what most people miss:" : "Here's the thing:"}

${topic.split(" ")[0]?.charAt(0).toUpperCase() + topic.split(" ")[0]?.slice(1)} is not just about the surface level.

It's about:

→ Understanding the fundamentals
→ Applying them consistently
→ Measuring what works

${goal === "sales" ? "Want to dive deeper? Link in bio 👇" : "What's your experience?"}

I'd love to hear your thoughts below.

${generateCTA(goal)}


#${topic.split(" ").join("").replace(/[^a-zA-Z0-9]/g, "")} #Growth #Success`;
  } else if (platform === "twitter") {
    content = `${topic.split(" ").slice(0, 4).join(" ")} 👇

${tone === "casual" ? "okay but seriously" : "Here's the truth"} — ${goal === "education" ? "most people get this wrong" : "nobody talks about this enough"}

let me explain 🧵

${topic.split(" ")[0] || "It"} starts with understanding the basics.

Then you apply it consistently.

Results follow.

Simple? Yes.
Easy? No.

${generateCTA(goal)}`;
  } else if (platform === "instagram") {
    content = `${topic} ✨

${goal === "engagement" ? "POV:" : "Here's something I wish I knew earlier:"}

${topic.split(" ").slice(0, 6).join(" ")}...

Save this for later 📌
${generateCTA(goal)}`;
  } else if (platform === "tiktok") {
    content = `🎬 TikTok Script: ${topic}

【HOOK - First 1-2 seconds】
${tone === "casual" ? "Okay wait," : "Stop scrolling if"} ${topic.split(" ").slice(0, 3).join(" ")}...
${goal === "engagement" ? "This changed everything" : "Here's what nobody tells you"}

【BODY - 15-45 seconds】
${topic.split(" ").slice(0, 5).join(" ")} isn't what you think...

Let me show you 👇

${goal === "education" ? "Step 1:" : "First,"} Understand the basics
${goal === "education" ? "Step 2:" : "Then,"} Apply consistently
${goal === "education" ? "Step 3:" : "Finally,"} Watch what happens

【CTA】
${generateCTA(goal)}
Follow for more ${goal === "education" ? "tips" : "content"}! 🚀`;
  } else {
    // Generic single post
    content = `${topic}

${tone === "professional" ? "Key points:" : "Here's the thing:"}

• ${topic.split(" ")[0] || "It"} matters more than you think
• Consistency is key
• Results take time

${generateCTA(goal)}`;
  }

  return {
    id: `${Date.now()}`,
    platform,
    contentType,
    content,
    hashtags: generateHashtags(topic, platform),
    cta: generateCTA(goal),
    tips: generateTips(platform, contentType),
  };
};

export default function AIChatPage() {
  const [topic, setTopic] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("threads");
  const [contentType, setContentType] = useState<ContentType>("single");
  const [selectedTone, setSelectedTone] = useState<Tone>("casual");
  const [selectedGoal, setSelectedGoal] = useState<ScriptGoal>("engagement");
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentPlatform = platforms.find(p => p.id === selectedPlatform);

  const handleGenerate = () => {
    if (!topic.trim() || isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      const script = generateScript(topic, selectedPlatform, contentType, selectedTone, selectedGoal);
      setGeneratedScript(script);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = () => {
    if (!topic.trim() || isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      const script = generateScript(topic, selectedPlatform, contentType, selectedTone, selectedGoal);
      setGeneratedScript(script);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Social Script Generator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Generate platform-specific social media content scripts</p>
        </div>
      </div>

      {/* Configuration Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Topic Input */}
        <Card className="border-border/50 p-4 md:col-span-2">
          <label className="text-sm font-medium mb-2 block">What's your script about?</label>
          <Textarea
            placeholder="e.g., 'Productivity tips for remote workers', 'How to grow your personal brand', 'Morning routine for success'..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={2}
            className="resize-none"
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleGenerate())}
          />
          <p className="text-xs text-muted-foreground mt-1">Press Enter to generate</p>
        </Card>

        {/* Platform Selection */}
        <Card className="border-border/50 p-4">
          <label className="text-sm font-medium mb-3 flex items-center gap-2">
            📱 Platform
          </label>
          <div className="grid grid-cols-2 gap-2">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all text-left",
                  selectedPlatform === platform.id
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border/50 hover:border-border hover:bg-muted/30"
                )}
              >
                <span className="text-lg">{platform.icon}</span>
                <div>
                  <span className="text-sm font-medium block">{platform.name}</span>
                  <span className="text-[10px] text-muted-foreground">{platform.description}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Content Type */}
        <Card className="border-border/50 p-4">
          <label className="text-sm font-medium mb-3 flex items-center gap-2">
            📝 Content Format
          </label>
          <div className="grid grid-cols-2 gap-2">
            {contentTypes.map((type) => {
              const isSupported = currentPlatform?.supports.includes(type.value);
              return (
                <button
                  key={type.value}
                  onClick={() => isSupported && setContentType(type.value)}
                  disabled={!isSupported}
                  className={cn(
                    "flex items-center gap-2 p-2.5 rounded-lg border transition-all text-sm",
                    contentType === type.value
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border/50 hover:border-border hover:bg-muted/30",
                    !isSupported && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <span>{type.icon}</span>
                  <span className="text-left">
                    <span className="font-medium">{type.label}</span>
                    <span className="text-[10px] text-muted-foreground block">{type.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Tone & Goal */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/50 p-4">
          <label className="text-sm font-medium mb-3 flex items-center gap-2">
            💭 Tone
          </label>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <button
                key={tone.value}
                onClick={() => setSelectedTone(tone.value)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                  selectedTone === tone.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <span className={cn("w-2 h-2 rounded-full", tone.color)} />
                {tone.label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="border-border/50 p-4">
          <label className="text-sm font-medium mb-3 flex items-center gap-2">
            🎯 Goal
          </label>
          <Select value={selectedGoal} onValueChange={(v) => setSelectedGoal(v as ScriptGoal)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {goals.map((goal) => (
                <SelectItem key={goal.value} value={goal.value}>
                  <span className="flex items-center gap-2">
                    <span>{goal.icon}</span>
                    <span>{goal.label}</span>
                    <span className="text-muted-foreground text-xs ml-2">{goal.description}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={!topic.trim() || isLoading}
        className="w-full gap-2"
        size="lg"
      >
        <Sparkles className={cn("h-5 w-5", isLoading && "animate-spin")} />
        {isLoading ? "Generating..." : "Generate Script"}
      </Button>

      {/* Generated Script Output */}
      {generatedScript && (
        <Card className="border-border/50 overflow-hidden">
          <div className="border-b border-border/50 px-4 py-3 flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="text-lg">{currentPlatform?.icon}</span>
              <span className="font-medium">{currentPlatform?.name} - {contentTypes.find(c => c.value === generatedScript.contentType)?.label}</span>
              <Badge variant="secondary" className="text-xs">
                {generatedScript.content.length} / {currentPlatform?.maxChars} chars
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                disabled={isLoading}
                className="gap-1.5"
              >
                <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
                Regenerate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(generatedScript.content, generatedScript.id)}
                className="gap-1.5"
              >
                {copiedId === generatedScript.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Main Content */}
            <div className="rounded-lg border border-border/50 bg-background p-4">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                {generatedScript.content}
              </pre>
            </div>

            {/* Hashtags */}
            <div>
              <label className="text-sm font-medium flex items-center gap-1.5 mb-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                Hashtags
              </label>
              <div className="flex flex-wrap gap-1.5">
                {generatedScript.hashtags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="font-mono text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div>
              <label className="text-sm font-medium mb-2">💡 Call-to-Action</label>
              <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-sm">{generatedScript.cta}</p>
              </div>
            </div>

            {/* Tips */}
            <div>
              <label className="text-sm font-medium flex items-center gap-1.5 mb-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                Pro Tips for {currentPlatform?.name}
              </label>
              <ul className="space-y-1.5">
                {generatedScript.tips.map((tip, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!generatedScript && !isLoading && (
        <Card className="border-border/50 border-dashed">
          <div className="text-center py-16">
            <Sparkles className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ready to create your script?</h3>
            <p className="text-muted-foreground mb-4">Enter your topic above and let AI generate platform-specific content for you</p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Threads</span>
              <span>•</span>
              <span>LinkedIn</span>
              <span>•</span>
              <span>Twitter</span>
              <span>•</span>
              <span>Instagram</span>
              <span>•</span>
              <span>TikTok</span>
            </div>
          </div>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && !generatedScript && (
        <Card className="border-border/50">
          <div className="text-center py-16">
            <div className="flex gap-1 justify-center mb-4">
              <span className="w-3 h-3 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-3 h-3 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-3 h-3 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p className="text-muted-foreground">Generating your script...</p>
          </div>
        </Card>
      )}
    </div>
  );
}
