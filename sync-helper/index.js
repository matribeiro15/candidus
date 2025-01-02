import { validateConfig } from "./config.js";
import { syncPosts } from "./components/SyncService.js";

async function main() {
  validateConfig();
  await syncPosts();
}

main();
