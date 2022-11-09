<template>
    <div class="p-3">
        <h2> Schema: {{ schema.name }} </h2>

        <p> Fields: {{ fieldCount }} </p>


    </div>
</template>



<script setup lang="ts">
    import { computed } from 'vue';
    import { Schema } from '../models/schemas';
    
    const props = defineProps({
        schema:  { type: Schema, required: true },
    });

    const fieldCount = computed(() => props.schema.getFields().length);
</script>






<style scoped lang="scss">

</style>