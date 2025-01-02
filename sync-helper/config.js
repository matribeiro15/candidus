import { configDotenv } from "dotenv";
configDotenv();

/** @type {string} */
export const GH_REMOTE_URL = process.env.GH_REMOTE_URL || "";

/** @type {string} */
export const GH_REMOTE_TOKEN = process.env.GH_REMOTE_TOKEN || "";

/** @type {string} */
export const GH_LOCAL_URL = process.env.GH_LOCAL_URL || "http://ghost:2368";

/** @type {string} */
export const GH_LOCAL_TOKEN = process.env.GH_LOCAL_TOKEN || "";

/** @type {number} */
export const SYNC_INTERVAL = +(process.env.SYNC_INTERVAL || 60000);

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
    console.group("Missing configuration params. Exiting ...");
    errors.forEach((error) => {
      console.error(`Missing param: ${error}`);
    });
    console.groupEnd();
    process.exit(1);
  }
};
