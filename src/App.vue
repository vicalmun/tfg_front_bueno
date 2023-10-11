<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavbarBar from '@/components/NavbarBar.vue';
</script>

<template>
  <NavbarBar></NavbarBar>

  <RouterView class="main-content" />
</template>

<style scoped>
.main-content {
  margin-top: 3rem;
  height: auto;
  width: 100%;
  padding: 1rem;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
