import {
  getLocalPost,
  createLocalPost,
  updateLocalPost,
  getLocalSiteInfo,
} from "./LocalApi.js";
import { getRemotePosts, getRemoteSiteInfo } from "./RemoteApi.js";
import { logger } from "../util/Logger.js";

export const printSiteInfo = async () => {
  const [remoteSiteInfo, localSiteInfo] = await Promise.all([
    getRemoteSiteInfo(),
    getLocalSiteInfo(),
  ]);
  logger.info(`Welcome to Ghost Sync Helper.`);
  logger.info(
    `You are syncing from '${remoteSiteInfo.title}' to '${localSiteInfo.title}'`
  );
  if (remoteSiteInfo.version !== localSiteInfo.version) {
    logger.warn("Local and remote API versions do not match:");
    logger.warn(`${remoteSiteInfo.title}[${remoteSiteInfo.url}] - v${remoteSiteInfo.version}`);
    logger.warn(`${localSiteInfo.title}[${localSiteInfo.url}] - v${localSiteInfo.version}`);
    logger.warn("Make sure you're using the same version of Ghost.");
  } else {
    logger.info("Local and remote API versions match. You're good to go!");
  }
};

export const printNextSyncTime = (interval) => {
  if(interval <= 60000) {
    logger.info(`Next sync scheduled in ${interval / 1000} seconds`);
  } 

  if(interval > 60000 && interval <= 3600000) {
    logger.info(`Next sync scheduled in ${interval / 60000} minutes`);
  }

  if(interval > 3600000) {
    logger.info(`Next sync scheduled in ${interval / 3600000} hours`);
  }
};

export const syncPosts = async () => {
  logger.info("Sync started");

  logger.debug("Fetching remote posts");
  const posts = await getRemotePosts();

  logger.debug("Starting to sync posts");
  const results = posts.map(async (post) => {
    try {
      const localPost = await getLocalPost(post.slug);
      if (localPost) {
        logger.debug(
          `Updating local post ID ${localPost.id} with remote post ID ${post.id} for slug ${post.slug}`
        );
        post.id = localPost.id;
        logger.info(`Updating post with slug '${post.slug}'`);
        await updateLocalPost(post);
        logger.debug(`Successfully updated post with slug '${post.slug}'`);
      } else {
        logger.info(`Creating post with slug '${post.slug}'`);
        await createLocalPost(post);
        logger.debug(`Successfully created post with slug '${post.slug}'`);
      }
    } catch (error) {
      logger.error(`Could not sync post with slug '${post.slug}'`, error);
    }
  });

  await Promise.allSettled(results);
  logger.info("Sync complete for all posts");
};
