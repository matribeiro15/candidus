import {
  GH_LOCAL_TOKEN,
  GH_LOCAL_URL,
  GH_API_VERSION,
} from "../config.js";

import GhostAdminApi from "@tryghost/admin-api";

// @ts-ignore
const api = new GhostAdminApi({
  url: GH_LOCAL_URL,
  version: GH_API_VERSION,
  // @ts-ignore
  key: GH_LOCAL_TOKEN,
  cache: false,
});

export const getLocalPost = async (slug) => {
  let result = null;
  try {
    const post = await api.posts.read({ slug: slug });
    result = post;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const getLocalPosts = async () => {
  return await api.posts.browse().catch((err) => console.error(err));
};

export const createLocalPost = async (post) => {
  return await api.posts.add(post).catch((err) => console.error(err));
};

export const updateLocalPost = async (post) => {
  return await api.posts.edit(post).catch((err) => console.error(err));
};
