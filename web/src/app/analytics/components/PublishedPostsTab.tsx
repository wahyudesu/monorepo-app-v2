import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye, Heart, MessageCircle, Flame, Play, Image as ImageIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { publishedPosts, analyticsPlatforms } from "@/data/mock";

const POSTS_PER_PAGE = 6;

export function PublishedPostsTab() {
  // Get unique platforms from posts
  const availablePlatforms = useMemo(() => {
    const platforms = new Set(publishedPosts.map((p) => p.platform));
    return Array.from(platforms);
  }, []);

  const [selectedPlatform, setSelectedPlatform] = useState<string>(availablePlatforms[0] || "");
  const [currentPage, setCurrentPage] = useState(1);

  // Sort posts: viral first, then by viral score
  const sortedPosts = useMemo(() => {
    return [...publishedPosts].sort((a, b) => {
      if (a.isViral && !b.isViral) return -1;
      if (!a.isViral && b.isViral) return 1;
      return (b.viralScore || 0) - (a.viralScore || 0);
    });
  }, []);

  // Filter posts by selected platform
  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((p) => p.platform === selectedPlatform);
  }, [sortedPosts, selectedPlatform]);

  // Reset page when filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedPlatform]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Generate pagination items
  const getPaginationItems = () => {
    const items: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        items.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        items.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return items;
  };

  // Post thumbnail preview based on type and platform
  const getPostThumbnail = (post: typeof publishedPosts[0]) => {
    // Twitter/Tweet - text preview
    if (post.platform === "twitter" || post.platform === "threads") {
      return (
        <div className="aspect-square bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950 dark:to-sky-900 rounded-lg flex items-center justify-center">
          <FileText className="h-8 w-8 text-sky-500" />
        </div>
      );
    }

    // Reels/Video - vertical preview
    if (post.type === "reel" || post.type === "video") {
      return (
        <div className="aspect-[9/16] bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-500/30 dark:to-pink-500/30 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Play className="h-10 w-10 text-white relative z-10" />
          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1">
            <span className="text-[10px] text-white/80">{formatNumber(post.views)} views</span>
          </div>
        </div>
      );
    }

    // Post/Image - square preview
    return (
      <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 rounded-lg flex items-center justify-center">
        <ImageIcon className="h-8 w-8 text-orange-500" />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Platform Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Filter by platform:</span>
        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            {availablePlatforms.map((platformId) => {
              const platform = analyticsPlatforms.find((p) => p.id === platformId);
              return (
                <SelectItem key={platformId} value={platformId}>
                  <span className="flex items-center gap-2">
                    <span>{platform?.icon}</span>
                    <span>{platform?.name}</span>
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">
          ({filteredPosts.length} posts)
        </span>
      </div>

      {/* Posts Grid with visual assets */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {paginatedPosts.map((post) => {
          const platform = analyticsPlatforms.find((pl) => pl.id === post.platform);
          return (
            <Card
              key={post.id}
              className={cn(
                "group overflow-hidden hover:shadow-lg transition-all cursor-pointer",
                post.isViral && "border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-transparent"
              )}
            >
              {/* Thumbnail */}
              <div className="p-3 pb-0">
                {getPostThumbnail(post)}
              </div>

              <CardContent className="p-3">
                {/* Platform & Type */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{platform?.icon}</span>
                    <span className="text-xs text-muted-foreground">{platform?.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {post.isViral && (
                      <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30 text-[10px] px-1.5 py-0">
                        <Flame className="h-2.5 w-2.5 mr-0.5" />
                        Viral
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {post.type === "video" ? "Video" : post.type}
                    </Badge>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-xs font-medium line-clamp-2 mb-2">
                  {post.title}
                </h4>

                {/* Stats */}
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Eye className="h-2.5 w-2.5" />
                    {formatNumber(post.views)}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Heart className="h-2.5 w-2.5" />
                    {formatNumber(post.likes)}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <MessageCircle className="h-2.5 w-2.5" />
                    {formatNumber(post.comments)}
                  </span>
                </div>

                {/* Engagement */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-muted-foreground">{post.publishedDate}</span>
                  <span className={cn(
                    "text-[10px] font-medium",
                    post.engagement >= 15 ? "text-green-600" : post.engagement >= 10 ? "text-yellow-600" : "text-muted-foreground"
                  )}>
                    {post.engagement}% engagement
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center pt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={cn(
                    currentPage === 1 && "pointer-events-none opacity-50",
                    "cursor-pointer"
                  )}
                />
              </PaginationItem>

              {getPaginationItems().map((item, index) => {
                if (item === "...") {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                const pageNum = item as number;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNum)}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={cn(
                    currentPage === totalPages && "pointer-events-none opacity-50",
                    "cursor-pointer"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found for the selected filters.</p>
        </div>
      )}
    </div>
  );
}
