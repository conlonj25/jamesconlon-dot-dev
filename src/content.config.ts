import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    spoiler: z.string(),
    pinned: z.boolean(),
  }),
});

export const collections = {
  posts: postsCollection,
};