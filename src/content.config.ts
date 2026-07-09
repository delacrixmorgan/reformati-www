import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    authors: z.array(z.string()).min(1),
    tags: z.array(z.string()),
    source: z.string().url(),
    excerpt: z.string().optional(),
  }),
});

export const collections = { articles };
