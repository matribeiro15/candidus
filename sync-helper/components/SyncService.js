import { getLocalPost, createLocalPost, updateLocalPost } from "./LocalApi.js";
import { getRemotePosts } from "./RemoteApi.js";
import { logger } from "../util/Logger.js";

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
