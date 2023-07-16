import { defineStore } from 'pinia'
import { type ImageResponse } from '@/interfaces'

export const useImageByIdStore = defineStore('imageId', {
  state: () => ({
    image: {} as ImageResponse
  }),
  actions: {
    async fetchImage(id: string) {
      const accessKey = 'Om8F2RE9V-N0yzKmlKs7GqSGM-XHWvR-U1Kn6j2re78'
      const apiUrl = `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`

      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        if (data) this.image = data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
