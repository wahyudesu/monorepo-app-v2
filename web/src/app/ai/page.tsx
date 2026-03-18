"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Composer } from "@/components/ui/composer";
import { GeneratedPostCard } from "@/components/post";
import { Card } from "@/components/ui/card";
import { TemplateManagerDialog } from "@/components/ui/template-manager-dialog";
import { generatePost, platforms, tones, goals, contentTypes } from "@/lib/constants/ai-post";
import type { Platform, ContentType, Tone, ScriptGoal, GeneratedPost } from "@/lib/types/ai-post";
import { getTemplateManager, type ComposerTemplate } from "@/lib/types/template";

export default function AIChatPage() {
	const [topic, setTopic] = useState("");
	const [selectedPlatform, setSelectedPlatform] = useState<Platform>("threads");
	const [contentType, setContentType] = useState<ContentType>("single");
	const [selectedGoal, setSelectedGoal] = useState<ScriptGoal>("engagement");
	const [selectedTone, setSelectedTone] = useState<Tone>("casual");
	const [posts, setPosts] = useState<GeneratedPost[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);
	const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

	const templateManager = getTemplateManager();

	const currentPlatform = platforms.find((p) => p.id === selectedPlatform);
	const supportedContentTypes = contentTypes.filter((c) => currentPlatform?.supports.includes(c.value));

	const handleGenerate = async (message: string, _files?: unknown[], tone?: string) => {
		if (!message.trim() || isGenerating) return;

		setTopic(message);
		if (tone) setSelectedTone(tone as Tone);
		setIsGenerating(true);

		try {
			const toneToUse = (tone || selectedTone) as Tone;
			const result = await generatePost(message, selectedPlatform, contentType, toneToUse, selectedGoal);

			const newPost: GeneratedPost = {
				id: `${Date.now()}`,
				platform: selectedPlatform,
				contentType,
				tone: toneToUse,
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

	const handleLoadTemplate = (template: ComposerTemplate) => {
		if (template.platform) setSelectedPlatform(template.platform as Platform);
		if (template.contentType) setContentType(template.contentType as ContentType);
		if (template.goal) setSelectedGoal(template.goal as ScriptGoal);
		if (template.tone) setSelectedTone(template.tone as Tone);
		if (template.message) setTopic(template.message);
	};

	const getCurrentConfig = () => ({
		platform: selectedPlatform,
		contentType: contentType,
		goal: selectedGoal,
		tone: selectedTone,
		message: topic,
	});

	return (
		<div className="mx-auto max-w-6xl space-y-6">
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

			{/* Composer with Tone Selector and Platform Selector */}
			<Composer
				placeholder="What do you want to post about?"
				onSubmit={handleGenerate}
				isLoading={isGenerating}
				showToolsButton={false}
				showToneSelector={true}
				toneOptions={tones}
				showTemplateButton={true}
				onTemplateClick={() => setIsTemplateDialogOpen(true)}
				templateCount={templateManager.templates.length}
				platformOptions={platforms.map((p) => ({
					id: p.id,
					name: p.name,
					icon: <span>{p.icon}</span>,
				}))}
				selectedPlatform={selectedPlatform}
				onPlatformSelect={(id) => setSelectedPlatform(id as Platform)}
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

			{/* Template Manager Dialog */}
			<TemplateManagerDialog
				isOpen={isTemplateDialogOpen}
				onClose={() => setIsTemplateDialogOpen(false)}
				templateManager={templateManager}
				onLoadTemplate={handleLoadTemplate}
				currentConfig={getCurrentConfig()}
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
