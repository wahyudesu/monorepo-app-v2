"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Composer } from "@/components/ui/composer";
import { GeneratedPostCard } from "@/components/ai";
import { Card } from "@/components/ui/card";
import { generatePost, platforms, tones, goals, contentTypes } from "@/lib/constants/ai-post";
import type { Platform, ContentType, Tone, ScriptGoal, GeneratedPost } from "@/lib/types/ai-post";
import { cn } from "@/lib/utils";

export default function AIChatPage() {
	const [topic, setTopic] = useState("");
	const [selectedPlatform, setSelectedPlatform] = useState<Platform>("threads");
	const [contentType, setContentType] = useState<ContentType>("single");
	const [selectedTone, setSelectedTone] = useState<Tone>("casual");
	const [selectedGoal, setSelectedGoal] = useState<ScriptGoal>("engagement");
	const [posts, setPosts] = useState<GeneratedPost[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);

	const currentPlatform = platforms.find((p) => p.id === selectedPlatform);
	const supportedContentTypes = contentTypes.filter((c) => currentPlatform?.supports.includes(c.value));

	const handleGenerate = async (message: string) => {
		if (!message.trim() || isGenerating) return;

		setTopic(message);
		setIsGenerating(true);

		try {
			const result = await generatePost(message, selectedPlatform, contentType, selectedTone, selectedGoal);

			const newPost: GeneratedPost = {
				id: `${Date.now()}`,
				platform: selectedPlatform,
				contentType,
				tone: selectedTone,
				goal: selectedGoal,
				content: result.content,
				hashtags: result.hashtags,
				cta: result.cta,
				createdAt: new Date(),
			};

			setPosts((prev) => [newPost, ...prev]);
		} catch (error) {
			console.error("Failed to generate post:", error);
		} finally {
			setIsGenerating(false);
		}
	};

	const handlePlan = async (id: string) => {
		console.log("Planning post:", id);
		// TODO: Implement plan/save to drafts
		alert("Post saved to drafts!");
	};

	const handlePost = async (id: string) => {
		console.log("Posting:", id);
		// TODO: Implement publish to platform
		const post = posts.find((p) => p.id === id);
		alert("Post published to " + platforms.find((p) => p.id === post?.platform)?.name + "!");
	};

	const handleDelete = (id: string) => {
		setPosts((prev) => prev.filter((p) => p.id !== id));
	};

	const cycleContentType = () => {
		const currentIndex = supportedContentTypes.findIndex((c) => c.value === contentType);
		const nextIndex = (currentIndex + 1) % supportedContentTypes.length;
		setContentType(supportedContentTypes[nextIndex]?.value || contentType);
	};

	const cycleGoal = () => {
		const currentIndex = goals.findIndex((g) => g.value === selectedGoal);
		const nextIndex = (currentIndex + 1) % goals.length;
		setSelectedGoal(goals[nextIndex]?.value || selectedGoal);
	};

	return (
		<div className="mx-auto max-w-2xl space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-display text-2xl font-bold tracking-tight flex items-center gap-2">
						<Sparkles className="h-6 w-6 text-primary" />
						AI Social Script Generator
					</h1>
					<p className="text-sm text-muted-foreground mt-1">Generate platform-specific social media content</p>
				</div>
			</div>

			{/* Platform Selector - Compact */}
			<Card className="border-border/50 p-3">
				<label className="text-xs font-medium mb-2 block text-muted-foreground">Platform</label>
				<div className="flex flex-wrap gap-2">
					{platforms.map((platform) => (
						<button
							key={platform.id}
							onClick={() => setSelectedPlatform(platform.id)}
							className={cn(
								"flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-sm",
								selectedPlatform === platform.id
									? "border-primary bg-primary/5"
									: "border-border/50 hover:border-border hover:bg-muted/30"
							)}
						>
							<span>{platform.icon}</span>
							<span className="font-medium">{platform.name}</span>
						</button>
					))}
				</div>
			</Card>

			{/* Composer with Tone Selector */}
			<Composer
				placeholder="What do you want to post about?"
				tone={selectedTone}
				onToneChange={(t) => setSelectedTone(t as Tone)}
				toneOptions={tones}
				onSubmit={handleGenerate}
				isLoading={isGenerating}
				showToolsButton={false}
				contextOptions={[
					{
						id: "content-type",
						label: "Format: " + supportedContentTypes.find((c) => c.value === contentType)?.label,
						description: supportedContentTypes.find((c) => c.value === contentType)?.description,
						onClick: cycleContentType,
					},
					{
						id: "goal",
						label: "Goal: " + goals.find((g) => g.value === selectedGoal)?.label,
						description: goals.find((g) => g.value === selectedGoal)?.description,
						onClick: cycleGoal,
					},
				]}
			/>

			{/* Generated Posts List */}
			{posts.length > 0 && (
				<div className="space-y-4">
					<h2 className="text-sm font-medium text-muted-foreground">Generated Posts ({posts.length})</h2>
					{posts.map((post) => (
						<GeneratedPostCard key={post.id} post={post} onPlan={handlePlan} onPost={handlePost} onDelete={handleDelete} />
					))}
				</div>
			)}

			{/* Empty State */}
			{posts.length === 0 && !isGenerating && (
				<Card className="border-border/50 border-dashed">
					<div className="text-center py-12">
						<Sparkles className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
						<h3 className="text-base font-semibold mb-1">Ready to create content?</h3>
						<p className="text-sm text-muted-foreground">Type your topic above and let AI generate posts for you</p>
					</div>
				</Card>
			)}

			{/* Loading State */}
			{isGenerating && (
				<Card className="border-border/50">
					<div className="text-center py-12">
						<div className="flex gap-1 justify-center mb-3">
							<span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
							<span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
							<span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
						</div>
						<p className="text-sm text-muted-foreground">Generating your post...</p>
					</div>
				</Card>
			)}
		</div>
	);
}
