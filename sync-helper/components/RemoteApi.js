import GhostAdminApi from "@tryghost/admin-api";
import { GH_REMOTE_TOKEN, GH_REMOTE_URL, GH_API_VERSION } from "../config.js";
import { logger } from "../util/Logger.js";
// @ts-ignore
const api = new GhostAdminApi({
  url: GH_REMOTE_URL,
  version: GH_API_VERSION,
  // @ts-ignore
  key: GH_REMOTE_TOKEN,
  cache: false,
});

export const getRemotePosts = async ({
  page = 1,
  limit = 100,
  include = "tags,authors",
  filter = "status:published",
} = {}) => {
  let posts = [];
  try {
    posts = await api.posts.browse(
      {
        page: page,
        limit: limit,
        include: include,
        filter: filter,
      },
      { cache: false }
    );
  } catch (error) {
    logger.error(error);
  } finally {
    return posts;
  }
};

export const getRemoteSiteInfo = async () => {
  let siteConfig = null;
  try {
    siteConfig = await api.site.read();
  } catch (error) {
    logger.error(error);
  } finally {
    return siteConfig;
  }
};