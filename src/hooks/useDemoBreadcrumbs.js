import { getEntry } from 'astro:content'
const useDemoBreadcrumbs = async (demo) => {
   if (!demo) return []

   const { data } = demo
   let crumbs = [{ label: 'Demos', url: '/demos' }]

   // Check if the demo has a series.
   if (data.hasOwnProperty('series')) {
      const { data: { title, slug } } = await getEntry('series', data.series?.id)
      crumbs = [...crumbs, { label: title, url: `/demos/${slug}` }]
   }

   crumbs = [...crumbs, { label: data.title, url: '' }]

   return crumbs
}

export { useDemoBreadcrumbs }