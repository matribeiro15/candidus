import { validateConfig, SYNC_INTERVAL } from "./config.js";
import { syncPosts, printSiteInfo, printNextSyncTime } from "./components/SyncService.js";

validateConfig();

async function main() {
  await printSiteInfo();
  await syncPosts();
  printNextSyncTime(SYNC_INTERVAL);
}

// Run the sync service
setTimeout(main, 5000);
setInterval(main, SYNC_INTERVAL);