<template>
    <div class="search-container">
        <input class="search-input" type="text" v-model="searchQuery" placeholder="Поиск..." />
        <button class="search-button" @click="searchImages">Найти</button>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { useImageStore } from '@/stores/image'

const searchStore = useImageStore();
const searchQuery = ref('');

const emit = defineEmits(['searchResults']);

const searchImages = async () => {
    if (searchQuery.value.trim() !== '') {
        try {
            const results = await searchStore.searchImages(searchQuery.value.trim());
            console.log(results, 'results');
            emit('searchResults', results);
        } catch (error) {
            console.error(error);
            searchStore.randomImages = [];
        }
    } else {
        searchStore.randomImages = [];
    }
}
</script>

<style lang="scss">
.search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .search-input {
        flex: 1;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 16px;
    }

    .search-button {
        margin-left: 8px;
        padding: 8px 16px;
        font-size: 16px;
        background-color: #333;
        color: #fff;
        border: none;
        border-radius: 16px;
        cursor: pointer;
    }
}
</style>