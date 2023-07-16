<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useImageByIdStore } from '@/stores/imageById';
import { type ImageResponse } from '@/interfaces';
import { useRoute } from 'vue-router';
import { useFavoriteStore } from '@/stores/favorite';

const route = useRoute();
const id = route.params.id.toString();
console.log(id);


const imageStore = useImageByIdStore();
const favoriteStore = useFavoriteStore();
const image = ref<ImageResponse>();

onMounted(async () => {
    await imageStore.fetchImage(id);
    image.value = imageStore.image;
});

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

<template>
    <div class="main">
        <div class="background-image" :style="{ backgroundImage: `url(${image?.urls?.full})` }" />
        <div class="card">
            <img :src="image?.urls?.full" :alt="image?.alt_description" />
            <template v-if="image">
                <button v-if="isFavorite(image)" @click="removeFromFavorites(image.id)">Удалить из избранного</button>
                <button v-else @click="addToFavorites(image)">Добавить в избранное</button>
            </template>
        </div>
        <div class="content">
            <h1>{{ image?.alt_description }}</h1>
            <div class="author">
                <img class="avatar" :src="image?.user?.profile_image?.small" />
                <p>{{ image?.user?.name }}</p>
            </div>

            <div class="info">
                <div class="views">
                    Просмотры
                    <p>{{ image?.views }}</p>
                </div>
                <div class="downloads">
                    Загружено
                    <p>{{ image?.downloads }}</p>
                </div>
                <div class="likes">
                    Лайки
                    <p>{{ image?.likes }}</p>
                </div>
            </div>

            <div class="tags">
                <p>Теги:</p>
                <div class="tags-list">
                    <span v-for="tag in image?.tags" :key="tag.title">{{ tag.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.main {
    display: flex;
    background: white;
    border-radius: 10px;
    padding: 40px;
    margin-top: 20px;
    min-height: calc(100vh - 80px);

    .background-image {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-size: cover;
        background-position: center;
        position: absolute;
        box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.2);
        z-index: -1;
        filter: blur(3px) brightness(0.7) grayscale(100%);
    }

    .card {
        width: 60%;
        height: 28rem;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        color: #fff;
        box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.2);
        background-size: cover;
        background-position: center;

        img {
            position: absolute;
            object-fit: cover;
            width: 100%;
            height: 100%;
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

        &:hover button {
            transition: opacity .3s ease-in;
            opacity: 1;
        }
    }

    .content {
        width: 40%;
        display: flex;
        flex-direction: column;
        padding-left: 2rem;
        align-items: flex-start;
        gap: 1rem;

        h1 {
            font-size: 2rem;
            text-transform: uppercase;
        }

        .author {
            display: flex;
            align-items: center;
            gap: 1rem;

            .avatar {
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                object-fit: cover;
            }
        }

        .info {
            display: flex;
            justify-content: space-between;
            width: 100%;

            .views,
            .downloads,
            .likes {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                color: #767676;
                font-size: 14px;

                p {
                    color: black;
                    font-weight: bold;
                }
            }

        }

        .tags {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            .tags-list {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;

                span {
                    background-color: #d7d5d5;
                    padding: 0.5rem;
                    border-radius: 5px;
                    font-size: 14px;
                    color: #4e4e4e;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .main {
        flex-direction: column;
        padding: 20px;

        .card {
            width: 100%;
            height: 20rem;
        }

        .content {
            margin-top: 18px;
            width: 100%;
            padding-left: 0;
            gap: 1rem;

            h1 {
                font-size: 1.5rem;
            }

            .author {
                gap: 0.5rem;

                .avatar {
                    width: 1.5rem;
                    height: 1.5rem;
                }
            }

            .info {
                flex-direction: column;
                gap: 0.5rem;
                width: 100%;

                .views,
                .downloads,
                .likes {
                    flex-direction: row;
                    justify-content: space-between;
                    width: 100%;
                }
            }

            .tags {
                width: 100%;
                gap: 0.5rem;

                .tags-list {
                    justify-content: center;
                }
            }
        }
    }
}
</style>