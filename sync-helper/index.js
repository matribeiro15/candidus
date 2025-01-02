import {
  getLocalPost,
  createLocalPost,
  updateLocalPost,
} from "./components/LocalApi.js";
import { getRemotePosts } from "./components/RemoteApi.js";
import { validateConfig } from "./config.js";

async function main() {
  validateConfig();
  const posts = await getRemotePosts();
  posts.forEach(async (post) => {
    const localPost = await getLocalPost(post.slug);
    if (localPost) {
      post.id = localPost.id;
      console.log(`Updating post ${post.slug}`);
      await updateLocalPost(post);
    } else {
      console.log(`Creating post ${post.slug}`);
      await createLocalPost(post);
    }
  });
}

main();
