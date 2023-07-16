<template>
    <div>
        <h1 class="page-title">Избранное</h1>
        <div v-if="favoriteImages.length === 0">
            <p>Ваш список избранного пуст.</p>
        </div>
        <div v-else>
            <div class="image">
                <div v-for="image in favoriteImages" :key="image.id" class="card">
                    <img :src="image.urls.regular" :alt="image.alt_description" />
                    <button @click="removeFromFavorites(image.id)">Удалить из избранного</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useFavoriteStore } from '@/stores/favorite';

const favoriteStore = useFavoriteStore();

const favoriteImages = ref(favoriteStore.favorite);

const removeFromFavorites = (id: string) => {
    favoriteStore.removeFromFavorites(id);
};

</script>
  
<style lang="scss" scoped>
.image {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    .card {
        width: 100%;
        height: 24rem;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        color: #fff;
        box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.2);
    }

    img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.8;
        transition: opacity .2s ease-out;
    }
}
</style>