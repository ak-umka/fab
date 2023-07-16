<template>
    <nav>
        <ul>
            <li>
                <router-link to="/">Главная</router-link>
            </li>
            <li>
                <router-link to="/favorites">Избранное</router-link>
            </li>
        </ul>
    </nav>
</template>
  
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
  
<style scoped>
nav {
    background-color: #f2f2f2;
    padding: 20px;
}

ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

li {
    margin-right: 20px;
}

router-link {
    text-decoration: none;
    color: #333;
    font-weight: bold;
}

router-link-active {
    color: #ff6f00;
}
</style>