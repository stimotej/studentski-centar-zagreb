import { PostsFilters } from ".";

const postsKeys = {
  posts: ["posts"],
  postsFiltered: (filters: PostsFilters) => [...postsKeys.posts, filters],
  post: (slug: string) => [...postsKeys.posts, slug],
  postById: (id: number) => [...postsKeys.posts, id],
};

export default postsKeys;
