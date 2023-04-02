import { PostsFilters } from ".";

const postsKeys = {
  posts: ["posts"],
  postsFiltered: (filters: PostsFilters) => [...postsKeys.posts, filters],
  post: (slug: string) => [...postsKeys.posts, slug],
};

export default postsKeys;
