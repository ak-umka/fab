<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
</script>

<template>
    <Header/>
    <div class="default-layout">
        <router-view />
    </div>
</template>

<style lang="scss">
.default-layout {
    padding: 24px 100px;
}

@media (max-width: 768px) {
    .default-layout {
        padding: 24px 20px;
    }
}
</style>
