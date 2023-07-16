import { defineStore } from 'pinia'
import { type ImageResponse } from '@/interfaces'

export const useImageStore = defineStore('image', {
  state: () => ({
    randomImages: [] as ImageResponse[]
  }),
  actions: {
    async fetchRandomImages() {
      const accessKey = 'Om8F2RE9V-N0yzKmlKs7GqSGM-XHWvR-U1Kn6j2re78'
      const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=8`

      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        if (data) this.randomImages = data
      } catch (error) {
        console.log(error)
      }
    },
    async searchImages(query: string) {
      const accessKey = 'Om8F2RE9V-N0yzKmlKs7GqSGM-XHWvR-U1Kn6j2re78'
      const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&page=1&per_page=8`

      try {
        const response = await fetch(apiUrl)
        const { results } = await response.json()
        console.log(results, 'results')
        if (results) this.randomImages = results
        return results
      } catch (error) {
        console.error(error)
        return []
      }
    }
  }
})
