export interface ContentScriptTemplate {
	id: string;
	name: string;
	// Content Script Engine specific config
	purpose: string;
	platform: string;
	persona: string;
	framework: string;
	tone: string;
	format: string;
	// Optional: saved topic
	topic?: string;
	// Timestamp
	createdAt: number;
}

export interface ToolTemplateManager {
	templates: ContentScriptTemplate[];
	saveTemplate: (template: Omit<ContentScriptTemplate, "id" | "createdAt">) => void;
	deleteTemplate: (id: string) => void;
	loadTemplate: (id: string) => ContentScriptTemplate | undefined;
}

const STORAGE_KEY = "content_script_templates";

export function createToolTemplateManager(): ToolTemplateManager {
	let templates: ContentScriptTemplate[] = [];

	// Load from localStorage on init
	const loadFromStorage = (): ContentScriptTemplate[] => {
		if (typeof window === "undefined") return [];
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : [];
		} catch {
			return [];
		}
	};

	templates = loadFromStorage();

	const saveToStorage = (updated: ContentScriptTemplate[]) => {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		} catch (e) {
			console.error("Failed to save templates:", e);
		}
	};

	return {
		get templates() {
			return templates;
		},

		saveTemplate(template: Omit<ContentScriptTemplate, "id" | "createdAt">) {
			const newTemplate: ContentScriptTemplate = {
				...template,
				id: `template-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
				createdAt: Date.now(),
			};
			templates = [...templates, newTemplate];
			saveToStorage(templates);
			return newTemplate;
		},

		deleteTemplate(id: string) {
			templates = templates.filter((t) => t.id !== id);
			saveToStorage(templates);
		},

		loadTemplate(id: string) {
			return templates.find((t) => t.id === id);
		},
	};
}

// Singleton instance
let templateManager: ToolTemplateManager | null = null;

export function getToolTemplateManager(): ToolTemplateManager {
	if (!templateManager) {
		templateManager = createToolTemplateManager();
	}
	return templateManager;
}
