import GhostAdminApi from "@tryghost/admin-api";
import { GH_LOCAL_TOKEN, GH_LOCAL_URL, GH_API_VERSION } from "../config.js";
import { logger } from "../util/Logger.js";

// @ts-ignore
const api = new GhostAdminApi({
  url: GH_LOCAL_URL,
  version: GH_API_VERSION,
  // @ts-ignore
  key: GH_LOCAL_TOKEN,
  cache: false,
});

export const getLocalPost = async (slug) => {
  let post = null;
  try {
    post = await api.posts.read({ slug: slug });
  } catch (error) {
    logger.error(error);
  } finally {
    return post;
  }
};

export const getLocalPosts = async () => {
  let posts = null;
  try {
    posts = await api.posts.browse();
  } catch (error) {
    logger.error(error);
  } finally {
    return posts;
  }
};

export const createLocalPost = async (post) => {
  let result = null;
  try {
    result = await api.posts.add(post);
  } catch (error) {
    logger.error(error);
  } finally {
    return result;
  }
};

export const updateLocalPost = async (post) => {
  let result = null;
  try {
    result = await api.posts.edit(post);
  } catch (error) {
    logger.error(error);
  } finally {
    return result;
  }
};

export const getLocalSiteInfo = async () => {
  let siteInfo = null;
  try {
    siteInfo = await api.site.read();
  } catch (error) {
    logger.error(error);
  } finally {
    return siteInfo;
  }
};