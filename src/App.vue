<script setup lang="ts">

import { RouterLink, RouterView } from "vue-router";

</script>

<template>
  <!-- <nav class="nav-tabs"> -->
    <nav class="navbar nav-tabs nav-justified bg-dark text-light mr-auto">
      <RouterLink class="nav-link" to="/">Home</RouterLink>
      <RouterLink class="nav-link" to="/schemas">Schemas</RouterLink> 
      <RouterLink class="nav-link" to="/objects">Objects</RouterLink> 
      <RouterLink class="nav-link" to="/Actions">Actions</RouterLink> 
      <RouterLink class="nav-link" to="/about">About</RouterLink> 
    </nav>

  <RouterView> </RouterView>

  <div style="height: 8000px"></div>

</template>

<style scoped lang="scss">
nav.navbar {
  font-size: 1.5rem;
  padding: 0;

  .nav-link {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: 1px solid #666;
    border-radius: 0;
  }
}

</style>
