
<template>
    <i v-if="!valid" class="text-danger">* </i><i v-else class="text-success bi-check"> </i>
</template>



<script setup lang="ts">
    import type { UnwrapRef } from 'vue';
    // import {}

    const props = defineProps({
        valid: { type: Boolean, required: true }
    });
</script>



<style scoped lang="scss">
</style>