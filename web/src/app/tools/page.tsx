"use client";

import { useState } from "react";
import { Wand2, UserCheck, FileText, Sparkles, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const tools = [
  { id: "script-engine", label: "Content Script Engine", icon: FileText, description: "Generate AI system prompts for content creation" },
  { id: "branding", label: "Personal Branding Builder", icon: UserCheck, description: "Build your personal brand identity" },
] as const;

type ToolId = (typeof tools)[number]["id"];

// Content purpose options
const contentPurposes = [
  { value: "edukasi", label: "📚 Edukasi", description: "Membagikan knowledge dan informasi" },
  { value: "entertainment", label: "🎬 Entertainment", description: "Menghibur dan menghibur audience" },
  { value: "promosi", label: "🚀 Promosi/Sales", description: "Mempromosikan produk/jasa" },
  { value: "inspirasi", label: "✨ Inspirasi/Motivasi", description: "Menginspirasi dan memotivasi" },
  { value: "engagement", label: "💬 Engagement/Storytelling", description: "Membangun connection dan engagement" },
] as const;

// Platform options
const platforms = [
  { value: "instagram", label: "📸 Instagram", description: "Reels, Carousel, Stories" },
  { value: "tiktok", label: "🎵 TikTok", description: "Short-form video 15-60s" },
  { value: "twitter", label: "𝕏 Twitter/X", description: "Threads, short posts" },
  { value: "youtube", label: "▶️ YouTube", description: "Long-form & Shorts" },
  { value: "linkedin", label: "💼 LinkedIn", description: "Professional content" },
] as const;

// Persona options
const personas = [
  { value: "expert-mentor", label: "🎓 Expert Mentor", description: "Authoritative, educational, trustworthy" },
  { value: "friendly-relatable", label: "😊 Friendly Relatable", description: "Casual, approachable, like-a-friend" },
  { value: "storyteller", label: "📖 Storyteller", description: "Narrative-driven, emotional, engaging" },
  { value: "provocative", label: "🔥 Provocative/Edgy", description: "Bold, controversial, attention-grabbing" },
  { value: "professional", label: "💼 Professional Corporate", description: "Formal, data-driven, business-focused" },
] as const;

// Copywriting framework options
const frameworks = [
  { value: "pas", label: "PAS", description: "Problem - Agitate - Solution", guidance: `PROBLEM: Identify the audience's pain point
AGITATE: Make the problem feel urgent and emotional
SOLUTION: Present your offering as the answer` },
  { value: "aida", label: "AIDA", description: "Attention - Interest - Desire - Action", guidance: `ATTENTION: Hook viewer immediately in first 3 seconds
INTEREST: Build curiosity with compelling facts or story
DESIRE: Show benefits and emotional payoff
ACTION: Clear, specific call-to-action` },
  { value: "fab", label: "FAB", description: "Features - Advantages - Benefits", guidance: `FEATURES: What the product/service has
ADVANTAGES: What those features mean (differentiation)
BENEFITS: What the user gets out of it (WIIFM)` },
  { value: "bab", label: "BAB", description: "Before - After - Bridge", guidance: `BEFORE: Describe current negative situation
AFTER: Paint picture of ideal positive outcome
BRIDGE: Show how your solution bridges the gap` },
  { value: "sss", label: "SSS", description: "Star - Story - Solution", guidance: `STAR: Introduce character or yourself as hero
STORY: Share struggle and journey
SOLUTION: Reveal what solved the problem` },
] as const;

// Tone options
const tones = [
  { value: "casual", label: "😊 Casual" },
  { value: "professional", label: "💼 Professional" },
  { value: "friendly", label: "🤗 Friendly" },
  { value: "humor", label: "😂 Humor" },
  { value: "serious", label: "😐 Serious" },
] as const;

// Platform-specific guidance
function getPlatformGuidance(platform: string): string {
  const guidance: Record<string, string> = {
    instagram: `• Visual-first approach
• Use 3-5 relevant hashtags
• Optimal: Reels (15-30s), Carousel (5-10 slides)
• First 3 seconds crucial for hook
• CTA: "Save this", "Share with someone who needs it"`,

    tiktok: `• Hook in first 1-2 seconds
• Use trending sounds when relevant
• Optimal length: 15-45 seconds
• Fast-paced editing
• CTA: "Follow for more", "Comment your thoughts"`,

    twitter: `• Concise, punchy sentences
• Use thread format for longer content
• 2-3 hashtags max
• Engage with replies
• CTA: "Retweet if you agree", "Thread 🧵"`,

    youtube: `• Hook in first 30 seconds
• Long-form: 8-15 minutes optimal
• Shorts: Under 60 seconds
• Pattern interrupt every 2-3 minutes
• CTA: "Subscribe", "Smash that like button"`,

    linkedin: `• Professional yet conversational
• Value-driven, not salesy
• Use line breaks for readability
• Tag relevant people/companies
• CTA: "Share your thoughts", "Let's connect"`,
  };
  return guidance[platform] || guidance.instagram;
}

// Generate system prompt based on inputs
function generateSystemPrompt(
  purpose: string,
  platform: string,
  persona: string,
  framework: string,
  topic: string,
  tone: string
): string {
  const purposeInfo = contentPurposes.find(p => p.value === purpose);
  const platformInfo = platforms.find(p => p.value === platform);
  const personaInfo = personas.find(p => p.value === persona);
  const frameworkInfo = frameworks.find(f => f.value === framework);
  const toneInfo = tones.find(t => t.value === tone);

  const personaDescription: Record<string, string> = {
    "expert-mentor": "You are an Expert Mentor - authoritative yet approachable. You have deep knowledge and experience in this field. Your tone is educational, trustworthy, and encouraging. You use clear explanations and back up claims with expertise.",
    "friendly-relatable": "You are a Friendly Relatable creator - like a supportive friend sharing valuable insights. Your tone is warm, casual, and genuine. You connect through shared experiences and vulnerability.",
    "storyteller": "You are a Storyteller - narrative-driven and emotionally engaging. You weave compelling narratives that draw people in. You use vivid details, emotional arcs, and relatable moments.",
    "provocative": "You are a Provocative/Edgy creator - bold, opinionated, and attention-grabbing. You challenge conventional thinking and stir conversation. You're not afraid of controversy when it serves the message.",
    "professional": "You are a Professional Corporate communicator - formal, polished, and business-focused. You use data, facts, and professional language. You maintain credibility and authority throughout.",
  };

  const purposeGuidance: Record<string, string> = {
    "edukasi": "Focus on clarity and learning outcomes. Break down complex topics into digestible pieces. Use examples and analogies.",
    "entertainment": "Prioritize engagement and enjoyment. Use humor, surprises, and emotional peaks. Keep energy high throughout.",
    "promosi": "Balance value with persuasion. Lead with benefit, not features. Build desire before making the ask.",
    "inspirasi": "Focus on emotional connection and aspirational messaging. Share wisdom and motivate action. Use empowering language.",
    "engagement": "Prioritize two-way communication. Ask questions, invite responses, create shareable moments. Build community.",
  };

  return `# CONTENT GENERATION SYSTEM PROMPT

## ROLE
${personaDescription[persona]}

## CONTEXT
You are creating content for: ${platformInfo?.label || platform}
Content Purpose: ${purposeInfo?.label || purpose} (${purposeInfo?.description || ""})
Topic: ${topic}
Tone: ${toneInfo?.label || tone}

## FRAMEWORK: ${frameworkInfo?.label} (${frameworkInfo?.description})
${frameworkInfo?.guidance || ""}

## CONTENT GOAL
${purposeGuidance[purpose] || ""}

## PLATFORM-SPECIFIC GUIDELINES
${getPlatformGuidance(platform)}

## OUTPUT REQUIREMENTS
1. Follow the ${frameworkInfo?.label} framework strictly
2. Maintain ${toneInfo?.label} tone throughout
3. Optimize for ${platformInfo?.label} specifically
4. Include appropriate call-to-action
5. Make it immediately usable - ready to publish

## DELIVERABLE
Create a complete content script following these guidelines. Include:
- Hook/headline
- Main body content using the framework
- Call-to-action
- Hashtag suggestions (if applicable to platform)

--- Generate the content script below ---`;
}

// Dummy branding builder
function generateBranding(name: string, niche: string, values: string, audience: string): string {
  if (!name || !niche) return "";

  const bios: Record<string, string> = {
    "tech": `${name} | Tech Creator & Digital Strategist 🚀\nHelping ${audience || "professionals"} navigate the digital landscape.\nTurning complex tech into simple, actionable insights.`,
    "lifestyle": `${name} | Lifestyle Creator ✨\nCurating the good life for ${audience || "millennials"}.\nAuthenticity over perfection. ${values || "Mindful living"} advocate.`,
    "business": `${name} | Business & Entrepreneurship 💼\nSharing the real side of building a brand.\nHelping ${audience || "entrepreneurs"} grow with proven strategies.`,
    "fitness": `${name} | Fitness & Wellness Coach 💪\nTransforming lives through ${values || "discipline & consistency"}.\n${audience || "Beginners"} welcome. Let's level up together.`,
  };

  const bio = bios[niche] || `${name} | ${niche} Creator 🌟\nPassionate about ${values || niche}.\nCreating content for ${audience || "a curious audience"}.`;

  const pillars = niche === "tech"
    ? ["Tech Reviews & Tutorials", "Industry News & Trends", "Career Growth Tips"]
    : niche === "lifestyle"
    ? ["Daily Routines & Rituals", "Product Reviews", "Wellness & Self-care"]
    : niche === "business"
    ? ["Startup Stories", "Marketing Strategies", "Mindset & Productivity"]
    : ["Educational Content", "Behind the Scenes", "Community Engagement"];

  return `═══════════════════════════════
  PERSONAL BRAND BLUEPRINT
═══════════════════════════════

📝 BIO:
${bio}

🎯 CONTENT PILLARS:
${pillars.map((p, i) => `  ${i + 1}. ${p}`).join("\n")}

🎨 BRAND VOICE:
Tone: ${values ? "Aligned with " + values : "Authentic & relatable"}
Style: Consistent visual identity across all platforms

📊 POSTING STRATEGY:
• Instagram: 4-5x/week (Reels + Carousel)
• TikTok: Daily (Short-form video)
• Twitter/X: 2-3x/day (Threads + Engagement)
• YouTube: 1-2x/week (Long-form + Shorts)

🚀 30-DAY QUICK WINS:
1. Optimize all social bios with the bio above
2. Create 10 pieces of pillar content
3. Engage with 20 accounts in your niche daily
4. Launch a signature content series
5. Collaborate with 2-3 creators in similar niche`;
}

function ContentScriptEngine() {
  const [purpose, setPurpose] = useState("edukasi");
  const [platform, setPlatform] = useState("instagram");
  const [persona, setPersona] = useState("expert-mentor");
  const [framework, setFramework] = useState("pas");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("casual");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }
    const prompt = generateSystemPrompt(purpose, platform, persona, framework, topic, tone);
    setOutput(prompt);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("System prompt copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Form Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Tujuan Konten */}
        <div className="space-y-2">
          <Label>Tujuan Konten</Label>
          <Select value={purpose} onValueChange={setPurpose}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {contentPurposes.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[11px] text-muted-foreground">
            {contentPurposes.find(p => p.value === purpose)?.description}
          </p>
        </div>

        {/* Platform */}
        <div className="space-y-2">
          <Label>Platform</Label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {platforms.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[11px] text-muted-foreground">
            {platforms.find(p => p.value === platform)?.description}
          </p>
        </div>

        {/* Persona */}
        <div className="space-y-2">
          <Label>Persona</Label>
          <Select value={persona} onValueChange={setPersona}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {personas.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[11px] text-muted-foreground">
            {personas.find(p => p.value === persona)?.description}
          </p>
        </div>

        {/* Strategi Copywriting */}
        <div className="space-y-2">
          <Label>Strategi Copywriting</Label>
          <Select value={framework} onValueChange={setFramework}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {frameworks.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label} - {f.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[11px] text-muted-foreground">
            {frameworks.find(f => f.value === framework)?.description}
          </p>
        </div>

        {/* Topic */}
        <div className="space-y-2 sm:col-span-2">
          <Label>Topik / Keyword</Label>
          <Input
            placeholder="e.g. Tips produktivitas untuk freelancer"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          />
        </div>

        {/* Tone */}
        <div className="space-y-2 sm:col-span-2">
          <Label>Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tones.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Generate Button */}
      <Button onClick={handleGenerate} disabled={!topic.trim()} className="gap-2">
        <Sparkles className="h-4 w-4" />
        Generate System Prompt
      </Button>

      {/* Output Panel */}
      {output && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">📋 Generated System Prompt</Label>
            <div className="flex gap-2">
              <Button onClick={handleCopy} variant="outline" size="sm" className="gap-1.5">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button onClick={handleGenerate} variant="outline" size="sm" className="gap-1.5">
                🔄 Regenerate
              </Button>
            </div>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
              {output}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

function BrandingTool() {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("tech");
  const [values, setValues] = useState("");
  const [audience, setAudience] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!name.trim()) return;
    setOutput(generateBranding(name, niche, values, audience));
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Your Name / Brand</Label>
          <Input placeholder="e.g. John Doe" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Niche</Label>
          <Select value={niche} onValueChange={setNiche}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">💻 Tech</SelectItem>
              <SelectItem value="lifestyle">✨ Lifestyle</SelectItem>
              <SelectItem value="business">💼 Business</SelectItem>
              <SelectItem value="fitness">💪 Fitness</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Core Values</Label>
          <Input placeholder="e.g. authenticity, growth" value={values} onChange={(e) => setValues(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Target Audience</Label>
          <Input placeholder="e.g. young professionals" value={audience} onChange={(e) => setAudience(e.target.value)} />
        </div>
      </div>
      <Button onClick={handleGenerate} disabled={!name.trim()} className="gap-2">
        <Wand2 className="h-4 w-4" />
        Build Brand Identity
      </Button>
      {output && (
        <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{output}</pre>
        </div>
      )}
    </div>
  );
}

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolId>("script-engine");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Tools 🛠️</h1>
        <p className="text-sm text-muted-foreground">Personal branding & content creation tools</p>
      </div>

      {/* Tool selector */}
      <div className="flex gap-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-4 py-3 text-left transition-all",
              activeTool === tool.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border/50 bg-card hover:border-border hover:shadow-sm"
            )}
          >
            <div className={cn(
              "rounded-lg p-2",
              activeTool === tool.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}>
              <tool.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">{tool.label}</p>
              <p className="text-[11px] text-muted-foreground">{tool.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Tool content */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          {activeTool === "script-engine" && <ContentScriptEngine />}
          {activeTool === "branding" && <BrandingTool />}
        </CardContent>
      </Card>
    </div>
  );
}
