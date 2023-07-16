<template>
    <nav>
        <ul>
            <div>
                <router-link to="/">
                    <img class="img" src="@/assets/images/logo.png" alt="Unsplash logo" />
                </router-link>
            </div>
            <div class="navigation">
                <li>
                    <router-link to="/favorites">Избранное</router-link>
                </li>
            </div>
        </ul>
    </nav>
</template>
  
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
  
<style scoped>
.navigation {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.img {
    width: 116px;
    height: 44px;
    margin-right: 20px;
}

nav {
    background-color: #000000;
    padding: 24px 100px;
}

ul {
    list-style: none;
    display: flex;
    align-items: center;
}

li {
    margin-right: 20px;
    color: #fff;
}

router-link {
    text-decoration: none;
    color: #333;
    font-weight: bold;
}

router-link-active {
    color: #ff6f00;
}

@media (max-width: 479px) {
    nav {
        padding: 12px 18px;
    }

    .img {
        width: 80px;
        height: 40px;
        margin-right: 20px;
    }

    ul {
        font-size: 12px;
    }
}
</style>