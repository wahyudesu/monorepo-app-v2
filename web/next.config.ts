import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Enable Cache Components for Partial Prerendering (PPR)
	cacheComponents: true,
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
