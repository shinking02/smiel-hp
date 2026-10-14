import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

export default defineCloudflareConfig({
	incrementalCache: r2IncrementalCache,
	// Without a queue, time-based revalidation is never triggered and pages stay
	// as built. This one revalidates through WORKER_SELF_REFERENCE.
	queue: memoryQueue,
});
