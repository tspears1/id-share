// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Define your collection(s)
const demos = defineCollection({
   loader: glob({
      pattern: '**/(*.mdx|*.md)',
      base: './src/data/demos',
   }),
   schema: z.object({
      isDraft: z.boolean(),
      slug: z.string(),
      title: z.string(),
      series: z.string().optional(),
      sortOrder: z.number(),
      author: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
   })
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { demos };