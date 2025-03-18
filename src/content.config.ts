import { defineCollection, z, reference } from 'astro:content';

import { glob, file } from 'astro/loaders';

// Demos ==========================================
const demos = defineCollection({
   loader: glob({
      pattern: '**/(*.mdx|*.md)',
      base: './src/data/demos',
   }),
   schema: z.object({
      isDraft: z.boolean(),
      slug: z.string(),
      title: z.string(),
      series: reference('series').optional(),
      sortOrder: z.number(),
      author: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      banner: z.string().optional(),
   })
});

// Series =========================================
const series = defineCollection({
   loader: file('src/data/series.json'),
   schema: z.object({
      title: z.string(),
      slug: z.string(),
   })
})

export const collections = { demos, series };