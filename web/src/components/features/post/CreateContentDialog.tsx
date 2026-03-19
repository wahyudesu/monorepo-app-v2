"use client";

import { useState, useRef, useEffect } from "react";
import { X, Image, Video, Paperclip, Upload, Square, LayoutPanelLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

interface CreateContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: string | null;
}

type ViewMode = "center" | "side";

export function CreateContentDialog({ open, onOpenChange, selectedDate }: CreateContentDialogProps) {
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [platform, setPlatform] = useState("instagram");
  const [contentType, setContentType] = useState("post");
  const [viewMode, setViewMode] = useState<ViewMode>("center");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle paste from clipboard
  useEffect(() => {
    if (!open) return;

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }

      if (files.length > 0) {
        e.preventDefault();
        handleMediaUpload(files);
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [open]);

  const handleMediaUpload = (files: FileList | File[]) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "video/mp4", "video/webm", "video/mov"];
    const maxSize = 50 * 1024 * 1024; // 50MB

    Array.from(files).forEach((file) => {
      if (!validTypes.includes(file.type)) {
        console.warn(`Invalid file type: ${file.type}`);
        return;
      }
      if (file.size > maxSize) {
        console.warn(`File too large: ${file.name}`);
        return;
      }

      const isVideo = file.type.startsWith("video/");
      const preview = isVideo
        ? "" // Video previews will be generated differently
        : URL.createObjectURL(file);

      const mediaFile: MediaFile = {
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview,
        type: isVideo ? "video" : "image",
      };

      setMediaFiles((prev) => [...prev, mediaFile]);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleMediaUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeMedia = (id: string) => {
    setMediaFiles((prev) => {
      const media = prev.find((m) => m.id === id);
      if (media?.preview) {
        URL.revokeObjectURL(media.preview);
      }
      return prev.filter((m) => m.id !== id);
    });
  };

  const handleCreate = () => {
    // TODO: Implement create logic
    console.log({ description, mediaFiles });
    onOpenChange(false);
    // Reset form
    setDescription("");
    setMediaFiles([]);
  };

  const handleClose = () => {
    // Cleanup previews
    mediaFiles.forEach((media) => {
      if (media.preview) URL.revokeObjectURL(media.preview);
    });
    setDescription("");
    setMediaFiles([]);
    onOpenChange(false);
  };

  return (
    <>
      {/* Center Peek - Dialog */}
      <Dialog open={open && viewMode === "center"} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent
          className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col"
          showCloseButton={false}
        >
          <DialogHeader className="shrink-0 flex-row items-start justify-between">
            <div>
              <DialogTitle>Create New Content Draft</DialogTitle>
              {selectedDate && <p className="text-sm text-muted-foreground">for {selectedDate}</p>}
            </div>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setViewMode("side")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LayoutPanelLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Side Peek</TooltipContent>
              </Tooltip>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4 py-4">
              {/* Media Preview Area */}
              {mediaFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {mediaFiles.map((media) => (
                    <div
                      key={media.id}
                      className="relative aspect-square rounded-lg overflow-hidden border border-border/50 group"
                    >
                      {media.type === "image" ? (
                        <img
                          src={media.preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={media.preview || URL.createObjectURL(media.file)}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}
                      <button
                        onClick={() => removeMedia(media.id)}
                        className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                      <div className="absolute bottom-1 left-1">
                        {media.type === "image" ? (
                          <div className="p-1 bg-black/50 rounded-md">
                            <Image className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="p-1 bg-black/50 rounded-md">
                            <Video className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Add more button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 flex flex-col items-center justify-center gap-1 transition-colors"
                  >
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Add More</span>
                  </button>
                </div>
              )}

              {/* Description Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Description</label>
                <Textarea
                  ref={textareaRef}
                  placeholder="What's this content about? Describe your post, video, or story..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  className="resize-none text-base font-medium"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {description.length} characters
                </p>
              </div>

              {/* Media Upload Area */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Media</label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 transition-colors",
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border/50 hover:border-border"
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={(e) => e.target.files && handleMediaUpload(e.target.files)}
                  />
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="p-3 bg-muted/50 rounded-full">
                      <Paperclip className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Drag & drop media here</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        or click to browse • Supports images & videos
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose Files
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      💡 Tip: You can also paste images from your clipboard (Ctrl+V)
                    </p>
                  </div>
                </div>
              </div>

              {/* Platform & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="w-full font-medium">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">📸 Instagram</SelectItem>
                      <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                      <SelectItem value="twitter">𝕏 Twitter</SelectItem>
                      <SelectItem value="youtube">▶️ YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="w-full font-medium">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">📝 Post</SelectItem>
                      <SelectItem value="reel">🎬 Reel</SelectItem>
                      <SelectItem value="story">📸 Story</SelectItem>
                      <SelectItem value="video">🎥 Video</SelectItem>
                      <SelectItem value="tweet">🐦 Tweet</SelectItem>
                      <SelectItem value="live">🔴 Live</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    defaultValue={selectedDate || undefined}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <input
                    type="time"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="shrink-0 gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!description.trim() && mediaFiles.length === 0}>
              Create Draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Side Peek - Sheet */}
      <Sheet open={open && viewMode === "side"} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <SheetContent
          side="right"
          className="max-h-screen overflow-hidden flex flex-col"
          showCloseButton={false}
        >
          <SheetHeader className="shrink-0 flex-row items-start justify-between">
            <div>
              <SheetTitle>Create New Content Draft</SheetTitle>
              {selectedDate && <p className="text-sm text-muted-foreground">for {selectedDate}</p>}
            </div>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setViewMode("center")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Center Peek</TooltipContent>
              </Tooltip>
            </div>
          </SheetHeader>

            <ScrollArea className="flex-1 -mx-8 px-8">
            <div className="space-y-4 py-4">
              {/* Media Preview Area */}
              {mediaFiles.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {mediaFiles.map((media) => (
                    <div
                      key={media.id}
                      className="relative aspect-square rounded-lg overflow-hidden border border-border/50 group"
                    >
                      {media.type === "image" ? (
                        <img
                          src={media.preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={media.preview || URL.createObjectURL(media.file)}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}
                      <button
                        onClick={() => removeMedia(media.id)}
                        className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                      <div className="absolute bottom-1 left-1">
                        {media.type === "image" ? (
                          <div className="p-1 bg-black/50 rounded-md">
                            <Image className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="p-1 bg-black/50 rounded-md">
                            <Video className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Add more button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 flex flex-col items-center justify-center gap-1 transition-colors"
                  >
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Add More</span>
                  </button>
                </div>
              )}

              {/* Description Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Description</label>
                <Textarea
                  placeholder="What's this content about? Describe your post, video, or story..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="resize-none text-base font-medium"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {description.length} characters
                </p>
              </div>

              {/* Media Upload Area */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Media</label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-4 transition-colors",
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border/50 hover:border-border"
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={(e) => e.target.files && handleMediaUpload(e.target.files)}
                  />
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="p-2 bg-muted/50 rounded-full">
                      <Paperclip className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Drag & drop media here</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        or click to browse
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose Files
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      💡 Tip: Ctrl+V to paste
                    </p>
                  </div>
                </div>
              </div>

              {/* Platform & Type */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="w-full font-medium">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">📸 Instagram</SelectItem>
                      <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                      <SelectItem value="twitter">𝕏 Twitter</SelectItem>
                      <SelectItem value="youtube">▶️ YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="w-full font-medium">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">📝 Post</SelectItem>
                      <SelectItem value="reel">🎬 Reel</SelectItem>
                      <SelectItem value="story">📸 Story</SelectItem>
                      <SelectItem value="video">🎥 Video</SelectItem>
                      <SelectItem value="tweet">🐦 Tweet</SelectItem>
                      <SelectItem value="live">🔴 Live</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    defaultValue={selectedDate || undefined}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <input
                    type="time"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>

          <SheetFooter className="shrink-0 gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!description.trim() && mediaFiles.length === 0}>
              Create Draft
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
