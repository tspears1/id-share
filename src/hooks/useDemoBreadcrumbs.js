import { useReferencedData } from './useReferencedData'
const useDemoBreadcrumbs = async (demo) => {
   if (!demo) return []

   const { data } = demo
   let crumbs = [{ label: 'Demos', url: '/demos' }]

   // Check if the demo has a series.
   const { title, slug, hasSeries } = await useReferencedData(data, 'series')
   if (hasSeries) {
      crumbs = [...crumbs, { label: title, url: `/demos/${slug}` }]
   }

   crumbs = [...crumbs, { label: data.title, url: '' }]

   return crumbs
}

export { useDemoBreadcrumbs }