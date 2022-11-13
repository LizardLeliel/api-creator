<template>
    <Transition name="fade-in-out">
        <slot></slot>
    </Transition>
</template>



<script setup lang="ts">

</script>




<style scoped lang="scss">
    .fade-in-out-enter-active,
    .fade-in-out-leave-active {
        transition: opacity 0.55s ease;
    }

    .fade-in-out-enter-from,
    .fade-in-out-leave-to {
        opacity: 0;
    }
</style>