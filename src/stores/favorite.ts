import { defineStore } from 'pinia'
import { type ImageResponse } from '@/interfaces'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorite: [] as ImageResponse[]
  }),
  actions: {
    addToFavorites(image: ImageResponse) {
      this.favorite.push(image)
    },
    removeFromFavorites(id: string) {
      const index = this.favorite.findIndex((favImage) => favImage.id === id)
      if (index !== -1) {
        this.favorite.splice(index, 1)
      }
    }
  }
})
