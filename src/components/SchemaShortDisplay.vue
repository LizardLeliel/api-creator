<template>
    <div class="p-2">
        <div class="h-100 p-3 shadow">
            <div class="row h-100">
                <div class="col-8">
                    <h2> Schema: {{ schema.name }} </h2>
                    <p> Fields: {{ fieldCount }} </p>
                    <p> {{ schema.description }} </p>
                </div>
                <div class="col-4 h-100">
                    <RouterLink :to="'/schemas/' + schema.name">
                        <button type="button" class="btn btn-dark h-100 w-100">
                            Edit
                        </button>
                    </RouterLink>
                </div>
            </div>
        </div>
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