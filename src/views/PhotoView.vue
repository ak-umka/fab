<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useImageByIdStore } from '@/stores/imageById';
import { type ImageResponse } from '@/interfaces';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id.toString();
console.log(id);


const imageStore = useImageByIdStore();
const image = ref<ImageResponse | null>(null);

onMounted(async () => {
    await imageStore.fetchImage(id);
    image.value = imageStore.image;
});

</script>

<template>
    <div class="main">
        <div class="card">
            <img :src="image?.urls?.full" :alt="image?.alt_description" />
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

    .card {
        width: 60%;
        height: 28rem;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        color: #fff;
        box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.2);

        img {
            position: absolute;
            object-fit: cover;
            width: 100%;
            height: 100%;
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
</style>