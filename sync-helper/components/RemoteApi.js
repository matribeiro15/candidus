import GhostAdminApi from "@tryghost/admin-api";

import {
  GH_REMOTE_TOKEN,
  GH_REMOTE_URL,
  GH_API_VERSION,
} from "../config.js";

// @ts-ignore
const api = new GhostAdminApi({
  url: GH_REMOTE_URL,
  version: GH_API_VERSION,
  // @ts-ignore
  key: GH_REMOTE_TOKEN,
  cache: false,
});

export const getRemotePost = async (slug) => {
  return await api.posts
    .read({ slug: slug })
    .catch((error) => console.error(error));
};

export const getRemotePosts = async ({
  page = 1,
  limit = 100,
  include = "tags",
  filter = "status:published",
} = {}) => {
  return await api.posts
    .browse(
      {
        page: page,
        limit: limit,
        include: include,
        filter: filter,
      },
      { cache: false }
    )
    .catch((error) => console.error(error));
};
