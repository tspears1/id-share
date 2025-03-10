import { getEntry } from 'astro:content'

const useReferencedData = async (referencedData, type) => {
   if (!referencedData) return []

   if (type === 'series') {
      if (!referencedData.hasOwnProperty('series')) {
         return { title: null, slug: null, hasSeries: false}
      }
      const { data: { title, slug } } = await getEntry('series', referencedData.series?.id)
      return {
         title: title ?? null,
         slug: slug ?? null,
         hasSeries: !!(title && slug)
      }
   }
}

export { useReferencedData }

