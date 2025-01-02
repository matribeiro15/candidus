import { logger } from "./util/Logger.js";

/** @type {string} */
export const GH_REMOTE_URL = process.env.GH_REMOTE_URL || "";

/** @type {string} */
export const GH_REMOTE_TOKEN = process.env.GH_REMOTE_TOKEN || "";

/** @type {string} */
export const GH_LOCAL_URL = process.env.GH_LOCAL_URL || "http://ghost:2368";

/** @type {string} */
export const GH_LOCAL_TOKEN = process.env.GH_LOCAL_TOKEN || "";

/** @type {number} */
export const SYNC_INTERVAL = +(process.env.SYNC_INTERVAL || 120000);

/** @type {string} */
export const GH_API_PATH = "ghost/api/admin";

/** @type {string} */
export const GH_API_VERSION = process.env.GH_API_VERSION || "v5.0";

export const validateConfig = () => {
  let errors = [];

  if (!GH_REMOTE_URL) {
    errors.push("GH_REMOTE_URL is not set");
  }
  if (!GH_REMOTE_TOKEN) {
    errors.push("GH_REMOTE_TOKEN is not set");
  }
  if (!GH_LOCAL_TOKEN) {
    errors.push("GH_LOCAL_TOKEN is not set");
  }

  if (errors.length > 0) {
    logger.error("Missing mandatory configuration params");
    errors.forEach((error) => {
      logger.error(`Missing param: ${error}`);
    });
    logger.error("Exiting...");
    process.exit(1);
  }
};
