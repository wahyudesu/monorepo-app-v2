export const teamMembers = [
  { id: "1", name: "Sarah Chen", role: "Admin" as const, email: "sarah@acme.com", avatar: "https://i.pravatar.cc/150?u=sarah", online: true, tasksCompleted: 24 },
  { id: "2", name: "James Wilson", role: "Editor" as const, email: "james@acme.com", avatar: "https://i.pravatar.cc/150?u=james", online: true, tasksCompleted: 31 },
  { id: "3", name: "Maria Garcia", role: "Member" as const, email: "maria@acme.com", avatar: "https://i.pravatar.cc/150?u=maria", online: false, tasksCompleted: 18 },
  { id: "4", name: "Alex Kim", role: "Editor" as const, email: "alex@acme.com", avatar: "https://i.pravatar.cc/150?u=alex", online: true, tasksCompleted: 27 },
  { id: "5", name: "Lisa Park", role: "Member" as const, email: "lisa@acme.com", avatar: "https://i.pravatar.cc/150?u=lisa", online: false, tasksCompleted: 15 },
  { id: "6", name: "Tom Brown", role: "Member" as const, email: "tom@acme.com", avatar: "https://i.pravatar.cc/150?u=tom", online: true, tasksCompleted: 22 },
];

export const projects = [
  { id: "1", name: "Website Redesign", progress: 72, tasks: 24, completed: 17, color: "hsl(220, 65%, 54%)" },
  { id: "2", name: "Mobile App v2", progress: 45, tasks: 32, completed: 14, color: "hsl(152, 60%, 42%)" },
  { id: "3", name: "API Migration", progress: 88, tasks: 16, completed: 14, color: "hsl(38, 92%, 50%)" },
];

export const recentTasks = [
  { id: "1", title: "Update landing page hero section", status: "in-progress" as const, assignee: "Sarah Chen", project: "Website Redesign" },
  { id: "2", title: "Fix authentication flow on mobile", status: "completed" as const, assignee: "James Wilson", project: "Mobile App v2" },
  { id: "3", title: "Write API documentation", status: "todo" as const, assignee: "Alex Kim", project: "API Migration" },
  { id: "4", title: "Design settings page mockup", status: "in-progress" as const, assignee: "Maria Garcia", project: "Website Redesign" },
  { id: "5", title: "Set up CI/CD pipeline", status: "completed" as const, assignee: "Tom Brown", project: "API Migration" },
];

export const activities = [
  { id: "1", user: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah", action: "completed task", target: "Update landing page hero section", project: "Website Redesign", time: "2 min ago" },
  { id: "2", user: "James Wilson", avatar: "https://i.pravatar.cc/150?u=james", action: "pushed 3 commits to", target: "feature/auth-flow", project: "Mobile App v2", time: "15 min ago" },
  { id: "3", user: "Maria Garcia", avatar: "https://i.pravatar.cc/150?u=maria", action: "uploaded design files for", target: "Settings page", project: "Website Redesign", time: "1 hour ago" },
  { id: "4", user: "Alex Kim", avatar: "https://i.pravatar.cc/150?u=alex", action: "created new endpoint", target: "/api/v2/users", project: "API Migration", time: "2 hours ago" },
  { id: "5", user: "Tom Brown", avatar: "https://i.pravatar.cc/150?u=tom", action: "deployed to staging", target: "v2.1.0-rc1", project: "API Migration", time: "3 hours ago" },
  { id: "6", user: "Lisa Park", avatar: "https://i.pravatar.cc/150?u=lisa", action: "reported bug in", target: "User profile modal", project: "Mobile App v2", time: "4 hours ago" },
  { id: "7", user: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah", action: "updated project timeline for", target: "Q1 Sprint", project: "Website Redesign", time: "5 hours ago" },
  { id: "8", user: "James Wilson", avatar: "https://i.pravatar.cc/150?u=james", action: "reviewed PR #142 on", target: "Mobile App v2", project: "Mobile App v2", time: "Yesterday" },
];

export const weeklyStats = [
  { day: "Mon", completed: 5, created: 8 },
  { day: "Tue", completed: 7, created: 4 },
  { day: "Wed", completed: 3, created: 6 },
  { day: "Thu", completed: 9, created: 5 },
  { day: "Fri", completed: 6, created: 7 },
  { day: "Sat", completed: 2, created: 1 },
  { day: "Sun", completed: 1, created: 2 },
];

// Social media dashboard data
// Platform type is now exported from @/components/social/PlatformIcon
export type Platform =
  | "instagram"
  | "tiktok"
  | "twitter"
  | "youtube"
  | "facebook"
  | "linkedin"
  | "pinterest"
  | "threads"
  | "whatsapp"
  | "reddit"
  | "bluesky"
  | "google"
  | "telegram"
  | "snapchat";

export interface SocialAccount {
  platform: Platform;
  handle: string;
  followers: number;
  followersChange: number;
  engagement: number;
  engagementChange: number;
  posts: number;
  impressions: number;
  impressionsChange: number;
  color: string;
}

export const socialAccounts: SocialAccount[] = [
  {
    platform: "instagram",
    handle: "@acme.studio",
    followers: 48200,
    followersChange: 3.2,
    engagement: 4.7,
    engagementChange: 0.3,
    posts: 342,
    impressions: 128000,
    impressionsChange: 12.5,
    color: "328 70% 55%",
  },
  {
    platform: "tiktok",
    handle: "@acmestudio",
    followers: 125800,
    followersChange: 8.7,
    engagement: 6.2,
    engagementChange: 1.1,
    posts: 89,
    impressions: 2400000,
    impressionsChange: 24.3,
    color: "349 70% 56%",
  },
  {
    platform: "twitter",
    handle: "@AcmeStudio",
    followers: 31400,
    followersChange: -0.8,
    engagement: 2.1,
    engagementChange: -0.2,
    posts: 1204,
    impressions: 89000,
    impressionsChange: -3.1,
    color: "203 89% 53%",
  },
  {
    platform: "youtube",
    handle: "Acme Studio",
    followers: 72100,
    followersChange: 5.4,
    engagement: 3.8,
    engagementChange: 0.6,
    posts: 156,
    impressions: 1850000,
    impressionsChange: 18.2,
    color: "0 72% 51%",
  },
];

export interface WeeklyGrowth {
  day: string;
  instagram: number;
  tiktok: number;
  twitter: number;
  youtube: number;
}

export const weeklyGrowth: WeeklyGrowth[] = [
  { day: "Mon", instagram: 120, tiktok: 340, twitter: 45, youtube: 210 },
  { day: "Tue", instagram: 85, tiktok: 520, twitter: 32, youtube: 180 },
  { day: "Wed", instagram: 200, tiktok: 410, twitter: 68, youtube: 290 },
  { day: "Thu", instagram: 150, tiktok: 680, twitter: 51, youtube: 340 },
  { day: "Fri", instagram: 310, tiktok: 450, twitter: 89, youtube: 260 },
  { day: "Sat", instagram: 95, tiktok: 280, twitter: 22, youtube: 150 },
  { day: "Sun", instagram: 70, tiktok: 190, twitter: 15, youtube: 120 },
];

export interface RecentPost {
  id: string;
  platform: Platform;
  title: string;
  likes: number;
  comments: number;
  shares: number;
  time: string;
  thumbnail?: string;
}

export const recentPosts: RecentPost[] = [
  { id: "1", platform: "tiktok", title: "Behind the scenes of our new campaign 🎬", likes: 24500, comments: 890, shares: 3200, time: "2h ago" },
  { id: "2", platform: "instagram", title: "Product launch announcement ✨", likes: 8700, comments: 342, shares: 520, time: "5h ago" },
  { id: "3", platform: "youtube", title: "How We Built Our Brand in 6 Months", likes: 4200, comments: 287, shares: 890, time: "1d ago" },
  { id: "4", platform: "twitter", title: "Thread: 10 lessons from scaling to 100k followers", likes: 2100, comments: 156, shares: 780, time: "1d ago" },
  { id: "5", platform: "instagram", title: "Team photo from our offsite 🏔️", likes: 6300, comments: 198, shares: 120, time: "2d ago" },
];

  // Calendar events
  export interface CalendarEvent {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    platform: Platform;
    type: "post" | "story" | "reel" | "video" | "tweet" | "live";
    time?: string;
    description?: string;
    status: "scheduled" | "published" | "draft";
    color: string;
    thumbnail?: string;
    mediaType?: "image" | "video";
  }

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth(); // 0-indexed

function d(day: number): string {
  return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export const calendarEvents: CalendarEvent[] = [
    // Published posts
    { id: "e1", title: "Product Launch Reel", date: d(3), platform: "instagram", type: "reel", time: "10:00", description: "30s reel showcasing new product features with trending audio", status: "published", color: "328 70% 55%", thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop", mediaType: "video" },
    { id: "e2", title: "BTS TikTok", date: d(3), platform: "tiktok", type: "video", time: "14:00", description: "Behind the scenes of content creation process", status: "published", color: "349 70% 56%", thumbnail: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop", mediaType: "video" },
    { id: "e3", title: "Weekly Thread", date: d(5), platform: "twitter", type: "tweet", time: "09:00", description: "Weekly tips thread on social media growth", status: "published", color: "203 89% 53%" },
    { id: "e4", title: "Tutorial Video", date: d(7), platform: "youtube", type: "video", time: "12:00", description: "Step-by-step tutorial on brand building", status: "published", color: "0 72% 51%", thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop", mediaType: "video" },
    { id: "e5", title: "Story Takeover", date: d(8), platform: "instagram", type: "story", time: "11:00", description: "Guest creator takes over our stories for a day", status: "published", color: "328 70% 55%", thumbnail: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&h=300&fit=crop", mediaType: "image" },
    { id: "e6", title: "Trending Challenge", date: d(10), platform: "tiktok", type: "video", time: "15:00", description: "Participate in trending challenge with brand twist", status: "published", color: "349 70% 56%", thumbnail: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=400&h=300&fit=crop", mediaType: "video" },
    { id: "e19", title: "LinkedIn Article", date: d(1), platform: "linkedin", type: "post", time: "08:00", description: "Industry insights and predictions for 2025", status: "published", color: "221 83% 53%", thumbnail: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop", mediaType: "image" },
    { id: "e20", title: "Threads Announcement", date: d(2), platform: "threads", type: "post", time: "12:00", description: "New feature announcement", status: "published", color: "0 0% 0%" },

    // Scheduled posts
    { id: "e7", title: "Engagement Post", date: d(12), platform: "instagram", type: "post", time: "18:00", description: "Carousel post with engagement hooks", status: "scheduled", color: "328 70% 55%", thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=300&fit=crop", mediaType: "image" },
    { id: "e8", title: "Live Q&A Session", date: d(14), platform: "youtube", type: "live", time: "19:00", description: "Monthly live Q&A with the community", status: "scheduled", color: "0 72% 51%", thumbnail: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop", mediaType: "video" },
    { id: "e9", title: "Product Demo", date: d(15), platform: "tiktok", type: "video", time: "13:00", description: "Quick product demo with voiceover", status: "scheduled", color: "349 70% 56%" },
    { id: "e10", title: "Twitter Space", date: d(17), platform: "twitter", type: "live", time: "20:00", description: "Twitter Space discussing industry trends", status: "scheduled", color: "203 89% 53%" },
    { id: "e21", title: "Instagram Story", date: d(13), platform: "instagram", type: "story", time: "09:00", description: "Morning motivation story", status: "scheduled", color: "328 70% 55%", thumbnail: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=400&h=300&fit=crop", mediaType: "image" },
    { id: "e22", title: "LinkedIn Carousel", date: d(16), platform: "linkedin", type: "post", time: "10:00", description: "Team introduction carousel", status: "scheduled", color: "221 83% 53%" },
    { id: "e23", title: "Threads Update", date: d(18), platform: "threads", type: "post", time: "15:00", description: "Product update thread", status: "scheduled", color: "0 0% 0%" },
    { id: "e24", title: "YouTube Short", date: d(19), platform: "youtube", type: "video", time: "11:00", description: "Quick tip YouTube Short", status: "scheduled", color: "0 72% 51%", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop", mediaType: "video" },

    // Draft posts
    { id: "e11", title: "Collab Reel", date: d(19), platform: "instagram", type: "reel", time: "10:00", description: "Collaboration reel with partner brand", status: "draft", color: "328 70% 55%", thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop", mediaType: "video" },
    { id: "e12", title: "Vlog Episode", date: d(20), platform: "youtube", type: "video", time: "14:00", description: "Weekly vlog episode - office tour", status: "draft", color: "0 72% 51%", thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop", mediaType: "video" },
    { id: "e13", title: "Meme Post", date: d(21), platform: "twitter", type: "tweet", time: "11:00", description: "Relatable industry meme", status: "draft", color: "203 89% 53%" },
    { id: "e14", title: "Dance Challenge", date: d(22), platform: "tiktok", type: "video", time: "16:00", description: "Team dance challenge video", status: "draft", color: "349 70% 56%", thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop", mediaType: "video" },
    { id: "e15", title: "Carousel Tips", date: d(25), platform: "instagram", type: "post", time: "09:00", description: "5 tips carousel for beginners", status: "draft", color: "328 70% 55%", thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop", mediaType: "image" },
    { id: "e16", title: "Podcast Clip", date: d(26), platform: "youtube", type: "video", time: "12:00", description: "Short clip from latest podcast episode", status: "draft", color: "0 72% 51%" },
    { id: "e17", title: "Poll Tweet", date: d(27), platform: "twitter", type: "tweet", time: "10:00", description: "Community poll about upcoming features", status: "draft", color: "203 89% 53%" },
    { id: "e18", title: "Duet Video", date: d(28), platform: "tiktok", type: "video", time: "15:00", description: "Duet with top creator in niche", status: "draft", color: "349 70% 56%", thumbnail: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop", mediaType: "video" },
    { id: "e25", title: "User Testimonial", date: d(23), platform: "linkedin", type: "post", time: "08:00", description: "Customer success story", status: "draft", color: "221 83% 53%", thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop", mediaType: "image" },
    { id: "e26", title: "Before/After", date: d(24), platform: "instagram", type: "post", time: "12:00", description: "Before and after transformation post", status: "draft", color: "328 70% 55%", thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop", mediaType: "image" },
    { id: "e27", title: "Quick Tip", date: d(29), platform: "threads", type: "post", time: "09:00", description: "Quick productivity tip", status: "draft", color: "0 0% 0%" },
    { id: "e28", title: "Behind Scenes", date: d(30), platform: "tiktok", type: "video", time: "14:00", description: "Behind the scenes content", status: "draft", color: "349 70% 56%", thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop", mediaType: "video" },
    { id: "e29", title: "Infographic", date: d(31), platform: "linkedin", type: "post", time: "10:00", description: "Industry statistics infographic", status: "draft", color: "221 83% 53%" },
    { id: "e30", title: "Story Series", date: d(1), platform: "instagram", type: "story", time: "08:00", description: "Day in the life story series", status: "draft", color: "328 70% 55%", thumbnail: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=300&fit=crop", mediaType: "image" },
  ];

// ==================== ANALYTICS DATA ====================

export type AnalyticsPlatform =
  | "youtube"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "twitter"
  | "pinterest"
  | "threads";

export interface AnalyticsPlatformConfig {
  id: AnalyticsPlatform;
  name: string;
  color: string;
  icon: string;
}

export const analyticsPlatforms: AnalyticsPlatformConfig[] = [
  { id: "youtube", name: "YouTube", color: "#FF0000", icon: "▶️" },
  { id: "facebook", name: "Facebook", color: "#1877F2", icon: "📘" },
  { id: "instagram", name: "Instagram", color: "#E4405F", icon: "📸" },
  { id: "tiktok", name: "TikTok", color: "#000000", icon: "🎵" },
  { id: "linkedin", name: "LinkedIn", color: "#0A66C2", icon: "💼" },
  { id: "twitter", name: "Twitter", color: "#1DA1F2", icon: "𝕏" },
  { id: "pinterest", name: "Pinterest", color: "#BD081C", icon: "📌" },
  { id: "threads", name: "Threads", color: "#000000", icon: "🧵" },
];

export interface PostAnalyticsData {
  date: string;
  displayDate: string;
  youtube: number;
  facebook: number;
  instagram: number;
  tiktok: number;
  linkedin: number;
  twitter: number;
  pinterest: number;
  threads: number;
}

export interface AnalyticsSummary {
  totalPosts: number;
  published: number;
  failed: number;
  successRate: number;
}

export const analyticsSummary: AnalyticsSummary = {
  totalPosts: 124832,
  published: 118420,
  failed: 6412,
  successRate: 94.86,
};

export interface BrandPerformance {
  totalFollowers: number;
  followersGrowth: string;
  totalImpressions: number;
  impressionsGrowth: string;
  avgEngagementRate: number;
  engagementGrowth: string;
  viralPosts: number;
  viralPostsGrowth: string;
  avgLikesPerPost: number;
  avgLikesGrowth: number;
}

export const brandPerformance: BrandPerformance = {
  totalFollowers: 277500,
  followersGrowth: "+12.5",
  totalImpressions: 4580000,
  impressionsGrowth: "+18.2",
  avgEngagementRate: 4.8,
  engagementGrowth: "+0.6",
  viralPosts: 24,
  viralPostsGrowth: "+8",
  avgLikesPerPost: 1245,
  avgLikesGrowth: 18,
};

// Helper function to generate date range
function generateDateRange(days: number): PostAnalyticsData[] {
  const data: PostAnalyticsData[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const displayDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    // Generate realistic data with some variance
    const baseMultiplier = days === 7 ? 100 : days === 30 ? 300 : 800;
    const variance = Math.random() * 0.4 + 0.8; // 0.8 to 1.2

    data.push({
      date: dateStr,
      displayDate,
      youtube: Math.floor(450 * baseMultiplier * variance * (Math.random() * 0.5 + 0.75)),
      facebook: Math.floor(380 * baseMultiplier * variance * (Math.random() * 0.5 + 0.75)),
      instagram: Math.floor(520 * baseMultiplier * variance * (Math.random() * 0.5 + 0.75)),
      tiktok: Math.floor(340 * baseMultiplier * variance * (Math.random() * 0.5 + 0.75)),
      linkedin: Math.floor(180 * baseMultiplier * variance * (Math.random() * 0.5 + 0.75)),
      twitter: Math.floor(290 * baseMultiplier * variance * (Math.random() * 0.5 + 0.75)),
      pinterest: Math.floor(120 * baseMultiplier * variance * (Math.random() * 0.5 + 0.75)),
      threads: Math.floor(95 * baseMultiplier * variance * (Math.random() * 0.5 + 0.75)),
    });
  }

  return data;
}

export const analyticsData7d = generateDateRange(7);
export const analyticsData30d = generateDateRange(30);
export const analyticsData90d = generateDateRange(90);

export interface PlatformStats {
  platform: AnalyticsPlatform;
  posts: number;
  success: number;
  failed: number;
  successRate: number;
  avgEngagement: number;
  trend: "up" | "down" | "neutral";
}

export const platformStats: PlatformStats[] = [
  { platform: "instagram", posts: 28450, success: 27120, failed: 1330, successRate: 95.32, avgEngagement: 4.8, trend: "up" },
  { platform: "youtube", posts: 24620, success: 23580, failed: 1040, successRate: 95.77, avgEngagement: 3.2, trend: "up" },
  { platform: "facebook", posts: 23180, success: 21840, failed: 1340, successRate: 94.22, avgEngagement: 2.9, trend: "neutral" },
  { platform: "tiktok", posts: 19840, success: 18620, failed: 1220, successRate: 93.85, avgEngagement: 6.4, trend: "up" },
  { platform: "twitter", posts: 15420, success: 14580, failed: 840, successRate: 94.55, avgEngagement: 1.8, trend: "down" },
  { platform: "linkedin", posts: 8920, success: 8620, failed: 300, successRate: 96.64, avgEngagement: 2.1, trend: "up" },
  { platform: "pinterest", posts: 3120, success: 2940, failed: 180, successRate: 94.23, avgEngagement: 1.2, trend: "neutral" },
  { platform: "threads", posts: 1282, success: 1120, failed: 162, successRate: 87.36, avgEngagement: 2.4, trend: "up" },
];

export interface ErrorLog {
  id: string;
  platform: AnalyticsPlatform;
  errorType: string;
  message: string;
  timestamp: string;
  postId?: string;
}

export const errorLogs: ErrorLog[] = [
  { id: "1", platform: "instagram", errorType: "Rate Limit", message: "API rate limit exceeded. Please retry after 1 hour.", timestamp: "2024-03-17 14:32:15", postId: "IG-28451" },
  { id: "2", platform: "tiktok", errorType: "Auth Error", message: "Authentication token expired. Please re-connect your account.", timestamp: "2024-03-17 14:15:42", postId: "TT-19234" },
  { id: "3", platform: "facebook", errorType: "API Error", message: "Invalid video format. MP4 required.", timestamp: "2024-03-17 13:58:21", postId: "FB-14523" },
  { id: "4", platform: "threads", errorType: "Upload Failed", message: "Network timeout during upload. Please check your connection.", timestamp: "2024-03-17 13:42:08", postId: "TH-0842" },
  { id: "5", platform: "youtube", errorType: "Policy Violation", message: "Content flagged for review. Video pending approval.", timestamp: "2024-03-17 12:28:55", postId: "YT-28456" },
  { id: "6", platform: "twitter", errorType: "Duplicate", message: "This post has already been published.", timestamp: "2024-03-17 11:15:33", postId: "TW-12453" },
  { id: "7", platform: "linkedin", errorType: "Validation Error", message: "Post exceeds maximum character limit (3000).", timestamp: "2024-03-17 10:42:17", postId: "LI-08421" },
  { id: "8", platform: "instagram", errorType: "Media Error", message: "Image resolution too low. Minimum 1080x1080 required.", timestamp: "2024-03-17 09:28:44", postId: "IG-28452" },
];

// ==================== PUBLISHED POSTS DATA ====================
export interface PublishedPost {
  id: string;
  title: string;
  platform: AnalyticsPlatform;
  type: "post" | "reel" | "story" | "video" | "tweet" | "live";
  publishedDate: string;
  thumbnail?: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagement: number; // calculated as (likes + comments + shares) / views * 100
  isViral: boolean;
  viralScore?: number; // 0-100
}

export const publishedPosts: PublishedPost[] = [
  {
    id: "p1",
    title: "Behind the scenes: How we create viral content 🎬",
    platform: "tiktok",
    type: "video",
    publishedDate: "Mar 15, 2024",
    views: 2450000,
    likes: 485000,
    comments: 12400,
    shares: 89500,
    engagement: 23.6,
    isViral: true,
    viralScore: 95,
  },
  {
    id: "p2",
    title: "10 productivity tips that changed my life ✨",
    platform: "instagram",
    type: "reel",
    publishedDate: "Mar 14, 2024",
    views: 1890000,
    likes: 342000,
    comments: 8900,
    shares: 45600,
    engagement: 20.9,
    isViral: true,
    viralScore: 92,
  },
  {
    id: "p3",
    title: "Building a startup from scratch - Full story",
    platform: "youtube",
    type: "video",
    publishedDate: "Mar 12, 2024",
    views: 890000,
    likes: 78000,
    comments: 12300,
    shares: 8900,
    engagement: 11.1,
    isViral: true,
    viralScore: 78,
  },
  {
    id: "p4",
    title: "Thread: Everything I learned about marketing",
    platform: "twitter",
    type: "tweet",
    publishedDate: "Mar 10, 2024",
    views: 1250000,
    likes: 156000,
    comments: 4200,
    shares: 67800,
    engagement: 18.3,
    isViral: true,
    viralScore: 88,
  },
  {
    id: "p5",
    title: "Office tour: Where the magic happens 🏢",
    platform: "instagram",
    type: "post",
    publishedDate: "Mar 8, 2024",
    views: 245000,
    likes: 28500,
    comments: 890,
    shares: 2100,
    engagement: 12.7,
    isViral: false,
    viralScore: 45,
  },
  {
    id: "p6",
    title: "Quick tutorial: Master this in 5 minutes",
    platform: "tiktok",
    type: "video",
    publishedDate: "Mar 5, 2024",
    views: 567000,
    likes: 89000,
    comments: 2340,
    shares: 12400,
    engagement: 18.5,
    isViral: true,
    viralScore: 82,
  },
  {
    id: "p7",
    title: "Weekly team standup highlights",
    platform: "linkedin",
    type: "post",
    publishedDate: "Mar 3, 2024",
    views: 124000,
    likes: 8900,
    comments: 567,
    shares: 423,
    engagement: 8.0,
    isViral: false,
    viralScore: 32,
  },
  {
    id: "p8",
    title: "Product announcement: We're live! 🚀",
    platform: "facebook",
    type: "post",
    publishedDate: "Mar 1, 2024",
    views: 345000,
    likes: 42500,
    comments: 1890,
    shares: 8900,
    engagement: 15.5,
    isViral: true,
    viralScore: 68,
  },
  {
    id: "p9",
    title: "Day in my life as a founder",
    platform: "youtube",
    type: "video",
    publishedDate: "Feb 28, 2024",
    views: 423000,
    likes: 38900,
    comments: 4560,
    shares: 2100,
    engagement: 10.9,
    isViral: false,
    viralScore: 55,
  },
  {
    id: "p10",
    title: "Monday motivation thread 💪",
    platform: "threads",
    type: "post",
    publishedDate: "Feb 26, 2024",
    views: 89000,
    likes: 12400,
    comments: 567,
    shares: 2340,
    engagement: 17.6,
    isViral: true,
    viralScore: 72,
  },
];
