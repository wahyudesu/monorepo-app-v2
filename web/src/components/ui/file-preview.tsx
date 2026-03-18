"use client";

import type { FC, ReactNode } from "react";
import { Cancel01Icon, HugeiconsIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface UploadedFile {
	id: string;
	name: string;
	url?: string;
	type?: string;
	size?: number;
}

export interface FilePreviewProps {
	files: UploadedFile[];
	onRemove?: (id: string) => void;
	className?: string;
}

export const FilePreview: FC<FilePreviewProps> = ({
	files,
	onRemove,
	className,
}) => {
	if (files.length === 0) return null;

	return (
		<div className={cn("px-3 pb-2", className)}>
			{files.map((file) => (
				<div
					key={file.id}
					className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
				>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
							{file.name}
						</p>
						{file.size && (
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								{(file.size / 1024).toFixed(1)} KB
							</p>
						)}
					</div>
					{onRemove && (
						<button
							type="button"
							onClick={() => onRemove(file.id)}
							className="flex-shrink-0 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
						>
							<HugeiconsIcon icon={Cancel01Icon} size={16} className="text-zinc-500" />
						</button>
					)}
				</div>
			))}
		</div>
	);
};

export default FilePreview;
