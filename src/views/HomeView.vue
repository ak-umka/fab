<template>
    <div>
        <h1 class="page-title">Главная страница</h1>
        <SearchBar @searchResults="updateRandomImages" />
        <div class="image">
            <div v-for="image in randomImages" class="card" :key="image.id">
                <img :src="image?.urls?.regular" :alt="image.alt_description" />
                <RouterLink :to="`/photo/${image.id}`">
                    <h3>{{ image?.alt_description }}</h3>
                    <p>{{ image?.user?.name }}</p>
                </RouterLink>
                <button v-if="isFavorite(image)" @click="removeFromFavorites(image.id)">Удалить из избранного</button>
                <button v-else @click="addToFavorites(image)">Добавить в избранное</button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useImageStore } from '@/stores/image'
import { useFavoriteStore } from '@/stores/favorite';

import SearchBar from '@/components/SearchBar.vue';
import { type ImageResponse } from '@/interfaces';


const imageStore = useImageStore();
const favoriteStore = useFavoriteStore();
const randomImages = ref<ImageResponse[]>([]);

onMounted(async () => {
    await imageStore.fetchRandomImages();
    randomImages.value = imageStore.randomImages;
});

const updateRandomImages = (results: any) => {
    randomImages.value = results;
};

const addToFavorites = (image: ImageResponse) => {
    favoriteStore.addToFavorites(image);
};

const removeFromFavorites = (id: string) => {
    favoriteStore.removeFromFavorites(id);
};

const isFavorite = (image: ImageResponse) => {
  return favoriteStore.favorite.some((favImage) => favImage.id === image.id);
};

</script>

<style lang="scss">
.image {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    .card {
        flex: 1 1 calc((100% / 3) - 2rem);
        width: 24rem;
        height: 24rem;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        color: #fff;
        box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.2);

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

        button {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30px;
            background-color: #050505;
            border: none;
            border-radius: 0 0 10px 10px;
            font-weight: normal;
            opacity: 0;
            transition: opacity .3s ease-out;
        }

        a {
            position: absolute;
            inset: auto auto 30px 30px;
            margin: 0;
            margin-bottom: 10px;
            transition: inset .3s .3s ease-out;
            font-weight: normal;
            text-transform: uppercase;
            opacity: 0;
            max-width: 80%;
            transition: opacity .3s ease-out;

            h3 {
                font-size: 1rem;
                font-weight: 500;
                line-height: 1.2;
                margin-bottom: 0.5rem;
            }

            p {
                font-size: 0.7rem;
                font-weight: 300;
                line-height: 1.2;
            }
        }

        &:hover a {
            opacity: 1;
            transition: opacity .5s .1s ease-in;
        }

        &:hover img {
            transition: opacity .3s ease-in;
            opacity: 1;
        }

        &:hover button {
            transition: opacity .3s ease-in;
            opacity: 1;
        }
    }
}

.page-title {
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: normal;
    text-transform: uppercase;
    font-size: 24px;
    margin-bottom: 16px;
    text-align: center;
}
</style>