<script setup lang="ts">

  import { RouterLink, RouterView } from "vue-router";

</script>


<template>
    <div id="modal-target"> </div>
    
    <nav class="navbar nav-tabs nav-justified mr-auto sticky-top">
      <RouterLink class="nav-link" to="/">Home</RouterLink>
      <RouterLink class="nav-link" to="/schemas">Schemas</RouterLink> 
      <RouterLink class="nav-link" to="/objects">Objects</RouterLink> 
      <RouterLink class="nav-link" to="/Actions">Actions</RouterLink> 
    </nav>

  <div class="container mb-4 mt-3">
    <RouterView> </RouterView>
  </div>


</template>

<style scoped lang="scss">



  nav.navbar {
    font-size: 1.5rem;
    padding: 0;

    .nav-link {
      padding-top: 1rem;
      padding-bottom: 1rem;
      border-radius: 0;
      overflow: hidden;
      background-color: #262626;
      color: #eee;

      &.router-link-active {
        // color: #999;
        color: #ddd;
        background-color: #444;
        background-image: linear-gradient(0deg, rgb(22%, 22%, 22%) 0%, rgba(0, 0, 0, 0) 33%);
      }
    }
  }

</style>
